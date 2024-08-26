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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaybandResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const payband_service_1 = require("./payband.service");
const payband_entity_1 = require("./entities/payband.entity");
const job_entity_1 = require("src/job/entities/job.entity");
const department_entity_1 = require("src/department/entities/department.entity");
const employee_entity_1 = require("src/employee/employee.entity");
let PaybandResolver = class PaybandResolver {
    constructor(paybandService) {
        this.paybandService = paybandService;
    }
    allPayBands() {
        return this.paybandService.findAll();
    }
    job(payband) {
        return this.paybandService.getJob(payband.jobId);
    }
    department(payband) {
        return this.paybandService.getDepartment(payband.departmentId);
    }
    employees(payband) {
        return this.paybandService.getEmployees(payband.id);
    }
};
exports.PaybandResolver = PaybandResolver;
__decorate([
    (0, graphql_1.Query)(() => [payband_entity_1.Payband]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaybandResolver.prototype, "allPayBands", null);
__decorate([
    (0, graphql_1.ResolveField)(() => job_entity_1.Job),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payband_entity_1.Payband]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], PaybandResolver.prototype, "job", null);
__decorate([
    (0, graphql_1.ResolveField)(() => department_entity_1.Department),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payband_entity_1.Payband]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], PaybandResolver.prototype, "department", null);
__decorate([
    (0, graphql_1.ResolveField)(() => [employee_entity_1.Employee]),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payband_entity_1.Payband]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PaybandResolver.prototype, "employees", null);
exports.PaybandResolver = PaybandResolver = __decorate([
    (0, graphql_1.Resolver)(() => payband_entity_1.Payband),
    __metadata("design:paramtypes", [payband_service_1.PaybandService])
], PaybandResolver);
//# sourceMappingURL=payband.resolver.js.map