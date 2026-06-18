import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreatePayslipDto {
  @IsString()
  employeeId!: string;

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
}