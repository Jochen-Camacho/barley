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
exports.Payband = void 0;
const graphql_1 = require("@nestjs/graphql");
const department_entity_1 = require("../../department/entities/department.entity");
const employee_entity_1 = require("../../employee/employee.entity");
const job_entity_1 = require("../../job/entities/job.entity");
const typeorm_1 = require("typeorm");
let Payband = class Payband {
};
exports.Payband = Payband;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Payband.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department, (department) => department.paybands),
    (0, graphql_1.Field)(() => department_entity_1.Department),
    __metadata("design:type", department_entity_1.Department)
], Payband.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Payband.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => job_entity_1.Job, (Job) => Job.payband),
    (0, graphql_1.Field)(() => job_entity_1.Job),
    __metadata("design:type", job_entity_1.Job)
], Payband.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Payband.prototype, "jobId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (employee) => employee.payband),
    (0, graphql_1.Field)(() => [employee_entity_1.Employee], { nullable: true, defaultValue: [] }),
    __metadata("design:type", Array)
], Payband.prototype, "employees", void 0);
exports.Payband = Payband = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Payband);
//# sourceMappingURL=payband.entity.js.map