export declare class CreatePayslipDto {
    employeeId: number;
    employeeName: string;
    designation: string;
    salary: number;
    panCard: string;
    dateOfJoining: string;
    bonus?: number;
    month: string;
    year: number;
    payableDays: number;
    paidDays: number;
    financialYear?: string;
    basicPay?: number;
}
