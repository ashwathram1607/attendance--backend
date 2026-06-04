import { OnModuleInit } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
export declare class AttendanceCron implements OnModuleInit {
    private readonly svc;
    constructor(svc: AttendanceService);
    onModuleInit(): Promise<void>;
    handleMidnight(): Promise<void>;
}
