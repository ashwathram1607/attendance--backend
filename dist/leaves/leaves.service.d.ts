import { Repository } from 'typeorm';
import { LeaveRequest } from './entities/leave-request.entity';
import { LeaveBalance } from './entities/leave-balance.entity';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
export declare class LeavesService {
    private leaveRequestRepo;
    private leaveBalanceRepo;
    constructor(leaveRequestRepo: Repository<LeaveRequest>, leaveBalanceRepo: Repository<LeaveBalance>);
    getBalance(name: string): Promise<LeaveBalance>;
    create(createLeaveDto: CreateLeaveDto): Promise<{
        message: string;
        leave: LeaveRequest;
        balance: LeaveBalance;
    }>;
    findAll(): Promise<LeaveRequest[]>;
    update(id: number, updateLeaveDto: UpdateLeaveDto): Promise<LeaveRequest | {
        message: string;
    }>;
}
