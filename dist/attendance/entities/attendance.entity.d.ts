export declare class Attendance {
    id: number;
    username: string;
    startTime: Date;
    endTime: Date | null;
    workedDuration: number;
    breakCount: number;
    totalBreakDuration: number;
    currentBreakStart: Date | null;
}
