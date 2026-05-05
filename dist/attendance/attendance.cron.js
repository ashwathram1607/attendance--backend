"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceCron = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const attendance_service_1 = require("./attendance.service");
let AttendanceCron = class AttendanceCron {
    svc;
    constructor(svc) {
        this.svc = svc;
    }
    async onModuleInit() {
        console.log('Startup auto checkout running...');
        await this.svc.autoCheckoutUnclosed();
    }
    async handleMidnight() {
        console.log('Scheduled auto checkout running...');
        await this.svc.autoCheckoutUnclosed();
    }
};
exports.AttendanceCron = AttendanceCron;
__decorate([
    (0, schedule_1.Cron)('1 0 * * *', {
        timeZone: 'Asia/Kolkata',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AttendanceCron.prototype, "handleMidnight", null);
exports.AttendanceCron = AttendanceCron = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceCron);
//# sourceMappingURL=attendance.cron.js.map