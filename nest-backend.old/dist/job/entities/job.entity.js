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
exports.Job = void 0;
const graphql_1 = require("@nestjs/graphql");
const department_entity_1 = require("../../department/entities/department.entity");
const employee_entity_1 = require("../../employee/employee.entity");
const payband_entity_1 = require("../../payband/entities/payband.entity");
const typeorm_1 = require("typeorm");
let Job = class Job {
};
exports.Job = Job;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Job.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Job.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_entity_1.Employee, (employee) => employee.job),
    (0, graphql_1.Field)(() => [employee_entity_1.Employee], { nullable: true }),
    __metadata("design:type", Array)
], Job.prototype, "employees", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, (department) => department.jobs),
    (0, graphql_1.Field)(() => department_entity_1.Department),
    __metadata("design:type", department_entity_1.Department)
], Job.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Job.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => payband_entity_1.Payband, (payband) => payband.job),
    (0, typeorm_1.JoinColumn)(),
    (0, graphql_1.Field)(() => payband_entity_1.Payband),
    __metadata("design:type", payband_entity_1.Payband)
], Job.prototype, "payband", void 0);
exports.Job = Job = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Job);
//# sourceMappingURL=job.entity.js.map