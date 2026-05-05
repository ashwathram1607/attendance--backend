import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayslipService } from './payslip.service';
import { PayslipController } from './payslip.controller';
import { Payslip } from './payslip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payslip])],
  controllers: [PayslipController],
  providers: [PayslipService],
})
export class PayslipModule {}
