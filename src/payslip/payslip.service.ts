import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payslip } from './payslip.entity';
import { CreatePayslipDto } from './dto/create-payslip.dto';

@Injectable()
export class PayslipService {
  constructor(
    @InjectRepository(Payslip)
    private payslipRepo: Repository<Payslip>,
  ) {}

  // ---------- MONTH MAP ----------
  private monthMap: Record<string, number> = {
    january: 1, february: 2, march: 3, april: 4,
    may: 5, june: 6, july: 7, august: 8,
    september: 9, october: 10, november: 11, december: 12,
  };

  private normalizeMonth(m: string) {
    return m?.toLowerCase().trim();
  }

  // ---------- FINANCIAL YEAR ----------
  private getFinancialYear(month: string, year: number): string {
    const m = this.normalizeMonth(month);
    const monthNumber = this.monthMap[m];

    if (!monthNumber) throw new BadRequestException('Invalid month');

    return monthNumber >= 4
      ? `${year}-${year + 1}`
      : `${year - 1}-${year}`;
  }

  // =========================================================
  // 💰 SALARY CALCULATION (ATTENDANCE BASED + FIXED ALLOWANCE)
  // =========================================================
  private calculate(dto: CreatePayslipDto) {
    const dailyRate = dto.salary / dto.payableDays;
    const earnedSalary = Math.round(dailyRate * dto.paidDays);

    // BASIC STRUCTURE
    const basicPay = Math.round(earnedSalary * 0.5);
    const hra = Math.round(basicPay * 0.5);

    // FIXED ALLOWANCES
    let medical = 1250;
    let conveyance = 1600;

    const specialAllowance = 0;
    const otherAllowance = 0;

    // INITIAL GROSS
    let gross =
      basicPay +
      hra +
      medical +
      conveyance +
      specialAllowance +
      otherAllowance;

    // -------------------------
    // ADJUSTMENT RULE
    // -------------------------
    if (gross > earnedSalary) {
      let excess = gross - earnedSalary;

      const medReduce = Math.min(medical, excess);
      medical -= medReduce;
      excess -= medReduce;

      const convReduce = Math.min(conveyance, excess);
      conveyance -= convReduce;
      excess -= convReduce;
    }

    if (gross < earnedSalary) {
      conveyance += earnedSalary - gross;
    }

    // FINAL GROSS
    gross =
      basicPay +
      hra +
      medical +
      conveyance +
      specialAllowance +
      otherAllowance;

    const bonus = Number(dto.bonus || 0);

    return {
      salary: earnedSalary,
      basicPay,
      hra,
      medicalAllowance: medical,
      conveyance,
      specialAllowance,
      otherAllowance,
      grossSalary: gross,
      bonus,
      netSalary: gross + bonus,

      // debug / analytics
      dailyRate,
      paidDays: dto.paidDays,
      payableDays: dto.payableDays,
    };
  }

  // =========================================================
  // 📊 YTD (OPTIMIZED - NO DOUBLE LOOP)
  // =========================================================
  private async recalculateYTD(employeeId: string, financialYear: string) {
    const records = await this.payslipRepo.find({
      where: {
        employeeId: String(employeeId),
        financialYear,
      },
      order: {
        id: 'ASC',
      },
    });

    if (!records.length) return;

    let basic = 0;
    let hra = 0;
    let conv = 0;
    let med = 0;
    let net = 0;

    for (const r of records) {
      basic += Number(r.basicPay || 0);
      hra += Number(r.hra || 0);
      conv += Number(r.conveyance || 0);
      med += Number(r.medicalAllowance || 0);
      net += Number(r.netSalary || 0);

      r.ytdBasicPay = basic;
      r.ytdHra = hra;
      r.ytdConveyance = conv;
      r.ytdMedicalAllowance = med;
      r.ytdNetSalary = net;
    }

    await this.payslipRepo.save(records);
  }

  // =========================================================
  // 🧾 CREATE
  // =========================================================
  async create(dto: CreatePayslipDto) {
    const financialYear = this.getFinancialYear(dto.month, dto.year);

    const calc = this.calculate(dto);

    const payslip = this.payslipRepo.create({
      ...dto,
      employeeId: String(dto.employeeId),
      month: this.normalizeMonth(dto.month),
      financialYear,
      ...calc,
    });

    const saved = await this.payslipRepo.save(payslip);

    await this.recalculateYTD(String(dto.employeeId), financialYear);

    return saved;
  }

  // =========================================================
  // ✏️ UPDATE (supports arrears fix)
  // =========================================================
  async update(id: number, dto: Partial<CreatePayslipDto>) {
    const payslip = await this.findOne(id);

    const month = dto.month ?? payslip.month;
    const year = dto.year ?? payslip.year;

    const financialYear = this.getFinancialYear(month, year);

    const merged = { ...payslip, ...dto };

    const calc = this.calculate(merged as CreatePayslipDto);

    Object.assign(payslip, {
      ...calc,
      employeeId: String(merged.employeeId),
      month: this.normalizeMonth(month),
      financialYear,
    });

    const updated = await this.payslipRepo.save(payslip);

    await this.recalculateYTD(String(payslip.employeeId), financialYear);

    return updated;
  }

  // =========================================================
  // 📋 GET
  // =========================================================
  findAll() {
    return this.payslipRepo.find({ order: { id: 'DESC' } });
  }

  async findOne(id: number) {
    const data = await this.payslipRepo.findOne({ where: { id } });
    if (!data) throw new NotFoundException('Payslip not found');
    return data;
  }

  // =========================================================
  // ❌ DELETE
  // =========================================================
  async remove(id: number) {
    const payslip = await this.findOne(id);

    const deleted = await this.payslipRepo.remove(payslip);

    await this.recalculateYTD(
      String(payslip.employeeId),
      payslip.financialYear,
    );

    return deleted;
  }
}