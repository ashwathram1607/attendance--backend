import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AttendanceModule } from './attendance/attendance.module';
import { AuthModule } from './auth/auth.module';
import { LeavesModule } from './leaves/leaves.module';
import { PermissionModule } from './permission/permission.module';
import { PayslipModule } from './payslip/payslip.module';
import { StaffModule } from './staff/staff.module';
import { Attendance } from './attendance/entities/attendance.entity';
import { User } from './user/user.entity';
import { Leave } from './leaves/entities/leave.entity';
import { LeaveBalance } from './leaves/entities/leave-balance.entity';
import { LeaveRequest } from './leaves/entities/leave-request.entity';
import { Permission } from './permission/entities/permission.entity';
import { Payslip } from './payslip/payslip.entity';
import { Staff } from './staff/entities/staff.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // ✅ REQUIRED for cron
    ScheduleModule.forRoot(),

    // ✅ Correct TypeORM async config
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, UserModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        entities: [
          Attendance,
          User,
          Leave,
          LeaveRequest,
          LeaveBalance,
          Permission,
          Payslip,
          Staff,
        ],
        ssl: {
          rejectUnauthorized: false,
        },
        synchronize: true, // ⚠️ dev only
      }),
    }),

    AttendanceModule,
    LeavesModule,
    AuthModule,
    PermissionModule,
    PayslipModule,
    StaffModule,
    UserModule,
  ],
})
export class AppModule {}
