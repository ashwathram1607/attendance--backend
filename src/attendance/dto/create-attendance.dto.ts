// src/attendance/dto/create-attendance.dto.ts
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAttendanceDto {
  @IsString()
  username: string;

  @IsOptional()
  @IsBoolean()
  isCheckedIn?: boolean;

  @IsOptional()
  @IsBoolean()
  isOnBreak?: boolean;

  @IsOptional()
  @IsNumber()
  startTime?: number; // optional, server computes if not provided

  @IsOptional()
  @IsNumber()
  elapsedTime?: number; // computed server-side

  @IsOptional()
  @IsNumber()
  breakCount?: number; // server increments automatically

  @IsOptional()
  @IsNumber()
  breakElapsed?: number; // server computes
}
