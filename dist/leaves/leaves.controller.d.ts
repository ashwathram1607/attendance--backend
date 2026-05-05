import { LeavesService } from './leaves.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
export declare class LeavesController {
    private readonly leavesService;
    constructor(leavesService: LeavesService);
    create(createLeaveDto: CreateLeaveDto): Promise<{
        message: string;
        leave: import("./entities/leave-request.entity").LeaveRequest;
        balance: import("./entities/leave-balance.entity").LeaveBalance;
    }>;
    findAll(): Promise<import("./entities/leave-request.entity").LeaveRequest[]>;
    getBalance(name: string): Promise<import("./entities/leave-balance.entity").LeaveBalance>;
    update(id: number, updateLeaveDto: UpdateLeaveDto): Promise<import("./entities/leave-request.entity").LeaveRequest | {
        message: string;
    }>;
}
