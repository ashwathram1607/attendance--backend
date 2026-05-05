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
exports.Payslip = void 0;
const typeorm_1 = require("typeorm");
const decimalTransformer = {
    to: (value) => value,
    from: (value) => Number(value),
};
let Payslip = class Payslip {
    id;
    employeeId;
    employeeName;
    designation;
    panCard;
    dateOfJoining;
    month;
    year;
    financialYear;
    salary;
    bonus;
    payableDays;
    paidDays;
    basicPay;
    hra;
    conveyance;
    medicalAllowance;
    specialAllowance;
    otherAllowance;
    grossSalary;
    netSalary;
    ytdBasicPay;
    ytdHra;
    ytdConveyance;
    ytdMedicalAllowance;
    ytdSpecialAllowance;
    ytdOtherAllowance;
    ytdBonus;
    ytdNetSalary;
    status;
    createdAt;
};
exports.Payslip = Payslip;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Payslip.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id', type: 'varchar', default: '' }),
    __metadata("design:type", String)
], Payslip.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_name', default: '' }),
    __metadata("design:type", String)
], Payslip.prototype, "employeeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Payslip.prototype, "designation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pan_card', default: '' }),
    __metadata("design:type", String)
], Payslip.prototype, "panCard", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'date_of_joining', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Payslip.prototype, "dateOfJoining", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], Payslip.prototype, "month", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Payslip.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'financial_year', default: '' }),
    __metadata("design:type", String)
], Payslip.prototype, "financialYear", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        default: 0,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Number)
], Payslip.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        default: 0,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Number)
], Payslip.prototype, "bonus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'payable_days', default: 0 }),
    __metadata("design:type", Number)
], Payslip.prototype, "payableDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'paid_days', default: 0 }),
    __metadata("design:type", Number)
], Payslip.prototype, "paidDays", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'basic_pay',
        type: 'decimal',
        default: 0,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Number)
], Payslip.prototype, "basicPay", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        default: 0,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Number)
], Payslip.prototype, "hra", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        default: 0,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Number)
], Payslip.prototype, "conveyance", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'medical_allowance',
        type: 'decimal',
        default: 0,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Number)
], Payslip.prototype, "medicalAllowance", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'special_allowance',
        type: 'decimal',
        default: 0,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Number)
], Payslip.prototype, "specialAllowance", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'other_allowance',
        type: 'decimal',
        default: 0,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Number)
], Payslip.prototype, "otherAllowance", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'gross_salary',
        type: 'decimal',
        default: 0,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Number)
], Payslip.prototype, "grossSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'net_salary',
        type: 'decimal',
        default: 0,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Number)
], Payslip.prototype, "netSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'ytd_basic_pay',
        type: 'decimal',
        default: 0,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Number)
], Payslip.prototype, "ytdBasicPay", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'ytd_hra',
        type: 'decimal',
        default: 0,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Number)
], Payslip.prototype, "ytdHra", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'ytd_conveyance',
        type: 'decimal',
        default: 0,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Number)
], Payslip.prototype, "ytdConveyance", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'ytd_medical_allowance',
        type: 'decimal',
        default: 0,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Number)
], Payslip.prototype, "ytdMedicalAllowance", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'ytd_special_allowance',
        type: 'decimal',
        default: 0,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Number)
], Payslip.prototype, "ytdSpecialAllowance", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'ytd_other_allowance',
        type: 'decimal',
        default: 0,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Number)
], Payslip.prototype, "ytdOtherAllowance", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'ytd_bonus',
        type: 'decimal',
        default: 0,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Number)
], Payslip.prototype, "ytdBonus", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'ytd_net_salary',
        type: 'decimal',
        default: 0,
        transformer: decimalTransformer,
    }),
    __metadata("design:type", Number)
], Payslip.prototype, "ytdNetSalary", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Pending' }),
    __metadata("design:type", String)
], Payslip.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Payslip.prototype, "createdAt", void 0);
exports.Payslip = Payslip = __decorate([
    (0, typeorm_1.Entity)('payslips')
], Payslip);
//# sourceMappingURL=payslip.entity.js.map