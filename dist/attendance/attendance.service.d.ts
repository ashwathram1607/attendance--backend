import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
export declare class AttendanceService {
    private readonly repo;
    private readonly logger;
    private readonly IST_OFFSET;
    private readonly DAY_MS;
    constructor(repo: Repository<Attendance>);
    private wrap;
    private istDayStartToUTC;
    private istDayEndToUTC;
    private findOpenRecord;
    checkIn(username: string): Promise<Attendance>;
    startBreak(username: string): Promise<Attendance>;
    endBreak(username: string): Promise<Attendance>;
    checkOut(username: string): Promise<Attendance>;
    getAll(): Promise<Attendance[]>;
    autoCheckoutUnclosed(): Promise<{
        closed: number;
    }>;
}
