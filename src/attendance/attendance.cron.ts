import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AttendanceService } from './attendance.service';

@Injectable()
export class AttendanceCron implements OnModuleInit {
  constructor(private readonly svc: AttendanceService) {}

  // ✅ Runs once when app starts
  async onModuleInit() {
    console.log('Startup auto checkout running...');
    await this.svc.autoCheckoutUnclosed();
  }

  // ✅ Runs every day at 12:01 AM IST
  @Cron('1 0 * * *', {
    timeZone: 'Asia/Kolkata',
  })
  async handleMidnight() {
    console.log('Scheduled auto checkout running...');
    await this.svc.autoCheckoutUnclosed();
  }
}
