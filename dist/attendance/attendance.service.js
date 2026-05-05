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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AttendanceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attendance_entity_1 = require("./entities/attendance.entity");
let AttendanceService = AttendanceService_1 = class AttendanceService {
    repo;
    logger = new common_1.Logger(AttendanceService_1.name);
    IST_OFFSET = 5.5 * 60 * 60 * 1000;
    DAY_MS = 24 * 60 * 60 * 1000;
    constructor(repo) {
        this.repo = repo;
    }
    wrap(att) {
        return att;
    }
    istDayStartToUTC(date = new Date()) {
        const istMs = date.getTime() + this.IST_OFFSET;
        const istDate = new Date(istMs);
        istDate.setHours(0, 0, 0, 0);
        return new Date(istDate.getTime() - this.IST_OFFSET);
    }
    istDayEndToUTC(date = new Date()) {
        const start = this.istDayStartToUTC(date);
        return new Date(start.getTime() + this.DAY_MS - 1);
    }
    findOpenRecord(username) {
        return this.repo.findOne({
            where: { username, endTime: (0, typeorm_2.IsNull)() },
            order: { startTime: 'DESC' },
        });
    }
    async checkIn(username) {
        if (!username)
            throw new common_1.BadRequestException('Username required');
        const open = await this.findOpenRecord(username);
        if (open)
            throw new common_1.BadRequestException('Already checked in');
        const record = await this.repo.save(this.repo.create({
            username,
            startTime: new Date(),
            endTime: null,
            workedDuration: 0,
            breakCount: 0,
            totalBreakDuration: 0,
            currentBreakStart: null,
        }));
        return this.wrap(record);
    }
    async startBreak(username) {
        const record = await this.findOpenRecord(username);
        if (!record)
            throw new common_1.BadRequestException('No active session');
        if (record.currentBreakStart)
            throw new common_1.BadRequestException('Break already running');
        record.currentBreakStart = new Date();
        record.breakCount += 1;
        return this.wrap(await this.repo.save(record));
    }
    async endBreak(username) {
        const record = await this.findOpenRecord(username);
        if (!record)
            throw new common_1.BadRequestException('No active session');
        if (!record.currentBreakStart)
            throw new common_1.BadRequestException('No break running');
        const now = new Date();
        const seconds = Math.round((now.getTime() - record.currentBreakStart.getTime()) / 1000);
        record.totalBreakDuration += Math.max(seconds, 0);
        record.currentBreakStart = null;
        return this.wrap(await this.repo.save(record));
    }
    async checkOut(username) {
        const record = await this.findOpenRecord(username);
        if (!record)
            throw new common_1.BadRequestException('No active session');
        const now = new Date();
        if (record.currentBreakStart) {
            const seconds = Math.round((now.getTime() - record.currentBreakStart.getTime()) / 1000);
            record.totalBreakDuration += Math.max(seconds, 0);
            record.currentBreakStart = null;
        }
        const workedSeconds = Math.round((now.getTime() - record.startTime.getTime()) / 1000);
        record.endTime = now;
        record.workedDuration = Math.max(workedSeconds - record.totalBreakDuration, 0);
        return this.wrap(await this.repo.save(record));
    }
    async getAll() {
        const records = await this.repo.find({
            order: { startTime: 'DESC' },
        });
        return records.map((r) => this.wrap(r));
    }
    async autoCheckoutUnclosed() {
        this.logger.log('Running auto checkout...');
        const openSessions = await this.repo.find({
            where: { endTime: (0, typeorm_2.IsNull)() },
        });
        const todayStartUtc = this.istDayStartToUTC();
        let closed = 0;
        for (const r of openSessions) {
            const sessionDayStartUtc = this.istDayStartToUTC(r.startTime);
            if (sessionDayStartUtc < todayStartUtc) {
                const sessionDayEndUtc = this.istDayEndToUTC(r.startTime);
                if (r.currentBreakStart) {
                    const seconds = Math.round((sessionDayEndUtc.getTime() - r.currentBreakStart.getTime()) / 1000);
                    r.totalBreakDuration += Math.max(seconds, 0);
                    r.currentBreakStart = null;
                }
                const workedSeconds = Math.round((sessionDayEndUtc.getTime() - r.startTime.getTime()) / 1000);
                r.endTime = sessionDayEndUtc;
                r.workedDuration = Math.max(workedSeconds - r.totalBreakDuration, 0);
                await this.repo.save(r);
                closed++;
            }
        }
        return { closed };
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = AttendanceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attendance_entity_1.Attendance)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map