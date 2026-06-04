"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayslipService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payslip_entity_1 = require("./payslip.entity");
let PayslipService = class PayslipService {
    payslipRepo;
    constructor(payslipRepo) {
        this.payslipRepo = payslipRepo;
    }
    monthMap = {
        january: 1, february: 2, march: 3, april: 4,
        may: 5, june: 6, july: 7, august: 8,
        september: 9, october: 10, november: 11, december: 12,
    };
    normalizeMonth(m) {
        return m?.toLowerCase().trim();
    }
    getFinancialYear(month, year) {
        const m = this.normalizeMonth(month);
        const monthNumber = this.monthMap[m];
        if (!monthNumber)
            throw new common_1.BadRequestException('Invalid month');
        return monthNumber >= 4
            ? `${year}-${year + 1}`
            : `${year - 1}-${year}`;
    }
    calculate(dto) {
        const dailyRate = dto.salary / dto.payableDays;
        const earnedSalary = Math.round(dailyRate * dto.paidDays);
        const basicPay = Math.round(earnedSalary * 0.5);
        const hra = Math.round(basicPay * 0.5);
        let medical = 1250;
        let conveyance = 1600;
        const specialAllowance = 0;
        const otherAllowance = 0;
        let gross = basicPay +
            hra +
            medical +
            conveyance +
            specialAllowance +
            otherAllowance;
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
            dailyRate,
            paidDays: dto.paidDays,
            payableDays: dto.payableDays,
        };
    }
    async recalculateYTD(employeeId, financialYear) {
        const records = await this.payslipRepo.find({
            where: {
                employeeId: String(employeeId),
                financialYear,
            },
            order: {
                id: 'ASC',
            },
        });
        if (!records.length)
            return;
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
    async create(dto) {
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
    async update(id, dto) {
        const payslip = await this.findOne(id);
        const month = dto.month ?? payslip.month;
        const year = dto.year ?? payslip.year;
        const financialYear = this.getFinancialYear(month, year);
        const merged = { ...payslip, ...dto };
        const calc = this.calculate(merged);
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
    findAll() {
        return this.payslipRepo.find({ order: { id: 'DESC' } });
    }
    async findOne(id) {
        const data = await this.payslipRepo.findOne({ where: { id } });
        if (!data)
            throw new common_1.NotFoundException('Payslip not found');
        return data;
    }
    async remove(id) {
        const payslip = await this.findOne(id);
        const deleted = await this.payslipRepo.remove(payslip);
        await this.recalculateYTD(String(payslip.employeeId), payslip.financialYear);
        return deleted;
    }
};
exports.PayslipService = PayslipService;
exports.PayslipService = PayslipService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payslip_entity_1.Payslip)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PayslipService);
//# sourceMappingURL=payslip.service.js.map