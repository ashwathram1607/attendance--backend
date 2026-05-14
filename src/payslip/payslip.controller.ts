import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';

import { PayslipService } from './payslip.service';
import { CreatePayslipDto } from './dto/create-payslip.dto';

@Controller('payslip')
export class PayslipController {
  constructor(private readonly payslipService: PayslipService) {}

  // =========================================================
  // CREATE
  // =========================================================
  @Post()
  create(@Body() createPayslipDto: CreatePayslipDto) {
    return this.payslipService.create(createPayslipDto);
  }

  // =========================================================
  // GET ALL PAYSLIPS
  // =========================================================
  @Get()
  findAll() {
    return this.payslipService.findAll();
  }

  // =========================================================
  // STAFF ROUTE
  // =========================================================
  @Get('staff')
  getStaff() {
    return this.payslipService.findAll();
  }

  // =========================================================
  // USERS ROUTE
  // =========================================================
  @Get('users')
  getUsers() {
    return this.payslipService.findAll();
  }

  // =========================================================
  // GET SINGLE PAYSLIP
  // IMPORTANT:
  // Keep this route LAST
  // =========================================================
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.payslipService.findOne(id);
  }

  // =========================================================
  // UPDATE
  // =========================================================
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePayslipDto: CreatePayslipDto,
  ) {
    return this.payslipService.update(id, updatePayslipDto);
  }
}