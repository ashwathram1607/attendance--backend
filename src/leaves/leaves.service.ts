import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveRequest } from './entities/leave-request.entity';
import { LeaveBalance } from './entities/leave-balance.entity';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';

@Injectable()
export class LeavesService {
  constructor(
    @InjectRepository(LeaveRequest)
    private leaveRequestRepo: Repository<LeaveRequest>,

    @InjectRepository(LeaveBalance)
    private leaveBalanceRepo: Repository<LeaveBalance>,
  ) {}

  // GET ALL BALANCES (IMPORTANT)
  async getAllBalances() {
    return this.leaveBalanceRepo.find();
  }

  // GET SINGLE EMPLOYEE BALANCE
  async getBalance(name: string): Promise<LeaveBalance> {
    let balance = await this.leaveBalanceRepo.findOne({ where: { name } });

    if (!balance) {
      balance = this.leaveBalanceRepo.create({
        name,
        sickLeave: 6,
        personalLeave: 6,
        earnedLeave: 12,
        maternityLeave: 0,
      });

      await this.leaveBalanceRepo.save(balance);
    }

    return balance;
  }

  // CREATE LEAVE REQUEST
  async create(createLeaveDto: CreateLeaveDto) {
    const { name } = createLeaveDto;

    const balance = await this.getBalance(name);

    const leave = this.leaveRequestRepo.create({
      ...createLeaveDto,
      status: 'Pending',
      submittedAt: new Date(),
    });

    const savedLeave = await this.leaveRequestRepo.save(leave);

    return {
      message: 'Leave request created successfully.',
      leave: savedLeave,
      balance,
    };
  }

  // GET ALL LEAVE REQUESTS
  async findAll() {
    return this.leaveRequestRepo.find();
  }

  // APPROVE / REJECT LEAVE
  async update(id: number, updateLeaveDto: UpdateLeaveDto) {
    const leave = await this.leaveRequestRepo.findOne({ where: { id } });

    if (!leave) {
      return { message: 'Leave request not found' };
    }

    if (updateLeaveDto.status === 'Approved' && leave.status !== 'Approved') {
      const balance = await this.getBalance(leave.name);

      const days =
        Math.ceil(
          (new Date(leave.toDate).getTime() -
            new Date(leave.fromDate).getTime()) /
            (1000 * 60 * 60 * 24),
        ) + 1;

      let errorMessage: string | null = null;

      switch (leave.leaveType) {
        case 'Sick Leave':
          if (days > balance.sickLeave)
            errorMessage = `Not enough Sick Leave. Remaining: ${balance.sickLeave}`;
          else balance.sickLeave -= days;
          break;

        case 'Personal Leave':
          if (days > balance.personalLeave)
            errorMessage = `Not enough Personal Leave. Remaining: ${balance.personalLeave}`;
          else balance.personalLeave -= days;
          break;

        case 'Earned Leave':
          if (days > balance.earnedLeave)
            errorMessage = `Not enough Earned Leave. Remaining: ${balance.earnedLeave}`;
          else balance.earnedLeave -= days;
          break;

        case 'Maternity Leave':
          if (days > balance.maternityLeave)
            errorMessage = `Not enough Maternity Leave. Remaining: ${balance.maternityLeave}`;
          else balance.maternityLeave -= days;
          break;

        default:
          errorMessage = 'Invalid leave type';
      }

      if (errorMessage) {
        return { message: errorMessage };
      }

      await this.leaveBalanceRepo.save(balance);
    }

    Object.assign(leave, updateLeaveDto);
    return this.leaveRequestRepo.save(leave);
  }
}