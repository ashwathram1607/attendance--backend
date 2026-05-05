import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreatePayslipDto {
  @Type(() => Number) // ✅ FIX
  @IsNumber()
  employeeId!: number;

  @IsString()
  employeeName!: string;

  @IsString()
  designation!: string;

  @Type(() => Number)
  @IsNumber()
  salary!: number;

  @IsString()
  panCard!: string;

  @IsDateString()
  dateOfJoining!: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  bonus?: number;

  @IsString()
  month!: string;

  @Type(() => Number)
  @IsNumber()
  year!: number;

  @Type(() => Number)
  @IsNumber()
  payableDays!: number;

  @Type(() => Number)
  @IsNumber()
  paidDays!: number;

  @IsOptional()
  @IsString()
  financialYear?: string;

  // optional calculated fields
  @IsOptional() @IsNumber() basicPay?: number;
}