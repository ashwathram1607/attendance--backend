import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PayslipService } from './payslip.service';
import { CreatePayslipDto } from './dto/create-payslip.dto';

@Controller('payslip')
export class PayslipController {
  constructor(private readonly payslipService: PayslipService) {}

  @Post()
  create(@Body() createPayslipDto: CreatePayslipDto) {
    return this.payslipService.create(createPayslipDto);
  }

  @Get()
  findAll() {
    return this.payslipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payslipService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePayslipDto: CreatePayslipDto) {
    return this.payslipService.update(+id, updatePayslipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payslipService.remove(+id);
  }
}