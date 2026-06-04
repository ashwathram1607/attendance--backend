import { PayslipService } from './payslip.service';
import { CreatePayslipDto } from './dto/create-payslip.dto';
export declare class PayslipController {
    private readonly payslipService;
    constructor(payslipService: PayslipService);
    create(createPayslipDto: CreatePayslipDto): Promise<import("./payslip.entity").Payslip>;
    findAll(): Promise<import("./payslip.entity").Payslip[]>;
    findOne(id: string): Promise<import("./payslip.entity").Payslip>;
    update(id: string, updatePayslipDto: CreatePayslipDto): Promise<import("./payslip.entity").Payslip>;
    remove(id: string): Promise<import("./payslip.entity").Payslip>;
}
