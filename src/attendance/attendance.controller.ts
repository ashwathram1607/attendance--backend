import { Controller, Post, Body, Get } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance } from './entities/attendance.entity';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('check-in')
  checkIn(@Body('username') username: string): Promise<any> {
    return this.attendanceService.checkIn(username);
  }

  @Post('start-break')
  startBreak(@Body('username') username: string): Promise<any> {
    return this.attendanceService.startBreak(username);
  }

  @Post('end-break')
  endBreak(@Body('username') username: string): Promise<any> {
    return this.attendanceService.endBreak(username);
  }

  @Post('check-out')
  checkOut(@Body('username') username: string): Promise<any> {
    return this.attendanceService.checkOut(username);
  }

  @Get()
  getAll(): Promise<any[]> {
    return this.attendanceService.getAll();
  }

  @Post('auto-checkout')
  autoCheckout(): Promise<{ closed: number }> {
    return this.attendanceService.autoCheckoutUnclosed();
  }
}
