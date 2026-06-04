import { AttendanceService } from './attendance.service';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    checkIn(username: string): Promise<any>;
    startBreak(username: string): Promise<any>;
    endBreak(username: string): Promise<any>;
    checkOut(username: string): Promise<any>;
    getAll(): Promise<any[]>;
    autoCheckout(): Promise<{
        closed: number;
    }>;
}
