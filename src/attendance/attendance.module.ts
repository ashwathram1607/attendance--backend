// src/attendance/attendance.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Attendance } from './entities/attendance.entity';
import { AttendanceCron } from './attendance.cron';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance])], // Important!
  providers: [AttendanceService, AttendanceCron],
  controllers: [AttendanceController],
})
export class AttendanceModule {}
