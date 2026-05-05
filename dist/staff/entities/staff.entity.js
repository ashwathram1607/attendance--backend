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
exports.Staff = void 0;
const typeorm_1 = require("typeorm");
let Staff = class Staff {
    id;
    employeeId;
    employeeName;
    designation;
    salary;
    pancard;
    dateOfJoining;
    location;
};
exports.Staff = Staff;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Staff.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Staff.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Staff.prototype, "employeeName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Staff.prototype, "designation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Staff.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Staff.prototype, "pancard", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Staff.prototype, "dateOfJoining", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Staff.prototype, "location", void 0);
exports.Staff = Staff = __decorate([
    (0, typeorm_1.Entity)()
], Staff);
//# sourceMappingURL=staff.entity.js.map