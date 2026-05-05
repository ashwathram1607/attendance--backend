"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const attendance_module_1 = require("./attendance/attendance.module");
const auth_module_1 = require("./auth/auth.module");
const leaves_module_1 = require("./leaves/leaves.module");
const permission_module_1 = require("./permission/permission.module");
const payslip_module_1 = require("./payslip/payslip.module");
const staff_module_1 = require("./staff/staff.module");
const attendance_entity_1 = require("./attendance/entities/attendance.entity");
const user_entity_1 = require("./user/user.entity");
const leave_entity_1 = require("./leaves/entities/leave.entity");
const leave_balance_entity_1 = require("./leaves/entities/leave-balance.entity");
const leave_request_entity_1 = require("./leaves/entities/leave-request.entity");
const permission_entity_1 = require("./permission/entities/permission.entity");
const payslip_entity_1 = require("./payslip/payslip.entity");
const staff_entity_1 = require("./staff/entities/staff.entity");
const user_module_1 = require("./user/user.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule, user_module_1.UserModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    url: config.get('DATABASE_URL'),
                    entities: [
                        attendance_entity_1.Attendance,
                        user_entity_1.User,
                        leave_entity_1.Leave,
                        leave_request_entity_1.LeaveRequest,
                        leave_balance_entity_1.LeaveBalance,
                        permission_entity_1.Permission,
                        payslip_entity_1.Payslip,
                        staff_entity_1.Staff,
                    ],
                    ssl: {
                        rejectUnauthorized: false,
                    },
                    synchronize: true,
                }),
            }),
            attendance_module_1.AttendanceModule,
            leaves_module_1.LeavesModule,
            auth_module_1.AuthModule,
            permission_module_1.PermissionModule,
            payslip_module_1.PayslipModule,
            staff_module_1.StaffModule,
            user_module_1.UserModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map