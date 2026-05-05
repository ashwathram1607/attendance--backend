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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeavesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const leave_request_entity_1 = require("./entities/leave-request.entity");
const leave_balance_entity_1 = require("./entities/leave-balance.entity");
let LeavesService = class LeavesService {
    leaveRequestRepo;
    leaveBalanceRepo;
    constructor(leaveRequestRepo, leaveBalanceRepo) {
        this.leaveRequestRepo = leaveRequestRepo;
        this.leaveBalanceRepo = leaveBalanceRepo;
    }
    async getBalance(name) {
        let balance = await this.leaveBalanceRepo.findOne({ where: { name } });
        if (!balance) {
            balance = this.leaveBalanceRepo.create({
                name,
                sickLeave: 6,
                personalLeave: 6,
                earnedLeave: 12,
                maternityLeave: 0,
            });
            await this.leaveBalanceRepo.save(balance);
        }
        return balance;
    }
    async create(createLeaveDto) {
        const { name } = createLeaveDto;
        const balance = await this.getBalance(name);
        const leave = this.leaveRequestRepo.create({
            ...createLeaveDto,
            status: 'Pending',
            submittedAt: new Date(),
        });
        const savedLeave = await this.leaveRequestRepo.save(leave);
        return {
            message: 'Leave request created successfully.',
            leave: savedLeave,
            balance,
        };
    }
    async findAll() {
        return this.leaveRequestRepo.find();
    }
    async update(id, updateLeaveDto) {
        const leave = await this.leaveRequestRepo.findOne({ where: { id } });
        if (!leave) {
            return { message: 'Leave request not found' };
        }
        if (updateLeaveDto.status === 'Approved' && leave.status !== 'Approved') {
            const balance = await this.getBalance(leave.name);
            const days = Math.ceil((new Date(leave.toDate).getTime() -
                new Date(leave.fromDate).getTime()) /
                (1000 * 60 * 60 * 24)) + 1;
            let errorMessage = null;
            switch (leave.leaveType) {
                case 'Sick Leave':
                    if (days > balance.sickLeave)
                        errorMessage = `Not enough Sick Leave. Remaining: ${balance.sickLeave}`;
                    else
                        balance.sickLeave -= days;
                    break;
                case 'Personal Leave':
                    if (days > balance.personalLeave)
                        errorMessage = `Not enough Personal Leave. Remaining: ${balance.personalLeave}`;
                    else
                        balance.personalLeave -= days;
                    break;
                case 'Earned Leave':
                    if (days > balance.earnedLeave)
                        errorMessage = `Not enough Earned Leave. Remaining: ${balance.earnedLeave}`;
                    else
                        balance.earnedLeave -= days;
                    break;
                case 'Maternity Leave':
                    if (days > balance.maternityLeave)
                        errorMessage = `Not enough Maternity Leave. Remaining: ${balance.maternityLeave}`;
                    else
                        balance.maternityLeave -= days;
                    break;
                default:
                    errorMessage = 'Invalid leave type';
            }
            if (errorMessage) {
                return { message: errorMessage };
            }
            await this.leaveBalanceRepo.save(balance);
        }
        Object.assign(leave, updateLeaveDto);
        return await this.leaveRequestRepo.save(leave);
    }
};
exports.LeavesService = LeavesService;
exports.LeavesService = LeavesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(leave_request_entity_1.LeaveRequest)),
    __param(1, (0, typeorm_1.InjectRepository)(leave_balance_entity_1.LeaveBalance)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LeavesService);
//# sourceMappingURL=leaves.service.js.map