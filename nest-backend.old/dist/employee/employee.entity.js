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
exports.Employee = void 0;
const graphql_1 = require("@nestjs/graphql");
const job_entity_1 = require("../job/entities/job.entity");
const location_entity_1 = require("../location/entities/location.entity");
const payband_entity_1 = require("../payband/entities/payband.entity");
const salary_entity_1 = require("../salary/entities/salary.entity");
const typeorm_1 = require("typeorm");
let Employee = class Employee {
};
exports.Employee = Employee;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Employee.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Employee.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Employee.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Employee.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], Employee.prototype, "admin", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => job_entity_1.Job, (job) => job.employees),
    (0, graphql_1.Field)(() => job_entity_1.Job),
    __metadata("design:type", job_entity_1.Job)
], Employee.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Employee.prototype, "jobId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => location_entity_1.Location, (location) => location.employees),
    (0, graphql_1.Field)(() => location_entity_1.Location),
    __metadata("design:type", location_entity_1.Location)
], Employee.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Employee.prototype, "locationId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => salary_entity_1.Salary, (salary) => salary.employee, { cascade: true }),
    (0, graphql_1.Field)(() => salary_entity_1.Salary),
    __metadata("design:type", salary_entity_1.Salary)
], Employee.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Employee.prototype, "salaryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payband_entity_1.Payband, (payband) => payband.employees),
    (0, graphql_1.Field)(() => payband_entity_1.Payband),
    __metadata("design:type", payband_entity_1.Payband)
], Employee.prototype, "payband", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Employee.prototype, "paybandId", void 0);
exports.Employee = Employee = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Employee);
//# sourceMappingURL=employee.entity.js.map