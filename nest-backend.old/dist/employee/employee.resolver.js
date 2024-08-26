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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const employee_service_1 = require("./employee.service");
const employee_entity_1 = require("./employee.entity");
const create_employee_input_1 = require("./dto/create-employee.input");
const job_entity_1 = require("src/job/entities/job.entity");
const location_entity_1 = require("src/location/entities/location.entity");
const salary_entity_1 = require("src/salary/entities/salary.entity");
const payband_entity_1 = require("src/payband/entities/payband.entity");
const login_input_1 = require("./dto/login-input");
const token_output_1 = require("./dto/token-output");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("src/guards/auth.guard");
const all_employee_input_1 = require("./dto/all-employee.input");
const change_role_input_1 = require("./dto/change-role.input");
const file_upload_input_1 = require("./dto/file-upload.input");
let EmployeeResolver = class EmployeeResolver {
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    allEmployees(allEmployeeArgs) {
        return this.employeeService.findAll(allEmployeeArgs);
    }
    maxEmployeeBaseSalary() {
        return this.employeeService.findMaxBaseSalary();
    }
    getLoggedInUser(context) {
        return this.employeeService.findById(context.userId);
    }
    addEmployee(createEmployeeInput) {
        return this.employeeService.createEmployee(createEmployeeInput);
    }
    changeRole(changeRoleInput) {
        return this.employeeService.changeRole(changeRoleInput);
    }
    uploadImage(fileUploadInput) {
        return this.employeeService.uploadImage(fileUploadInput);
    }
    login(loginInput) {
        return this.employeeService.login(loginInput);
    }
    job(employee) {
        return this.employeeService.getJob(employee.jobId);
    }
    location(employee) {
        return this.employeeService.getLocation(employee.locationId);
    }
    salary(employee) {
        return this.employeeService.getSalary(employee.salaryId);
    }
    payband(employee) {
        return this.employeeService.getPaybad(employee.paybandId);
    }
};
exports.EmployeeResolver = EmployeeResolver;
__decorate([
    (0, graphql_1.Query)(() => [employee_entity_1.Employee]),
    __param(0, (0, graphql_1.Args)('allEmployeeArgs')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [all_employee_input_1.AllEmployeeArgs]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], EmployeeResolver.prototype, "allEmployees", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_1.Int),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], EmployeeResolver.prototype, "maxEmployeeBaseSalary", null);
__decorate([
    (0, graphql_1.Query)(() => employee_entity_1.Employee),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], EmployeeResolver.prototype, "getLoggedInUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => employee_entity_1.Employee),
    __param(0, (0, graphql_1.Args)('createEmployeeInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_input_1.CreateEmployeeInput]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], EmployeeResolver.prototype, "addEmployee", null);
__decorate([
    (0, graphql_1.Mutation)(() => employee_entity_1.Employee),
    __param(0, (0, graphql_1.Args)('changeRoleInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_role_input_1.ChangeRoleInput]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], EmployeeResolver.prototype, "changeRole", null);
__decorate([
    (0, graphql_1.Mutation)(() => employee_entity_1.Employee),
    __param(0, (0, graphql_1.Args)('fileUploadInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_upload_input_1.FileUploadInput]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], EmployeeResolver.prototype, "uploadImage", null);
__decorate([
    (0, graphql_1.Mutation)(() => token_output_1.Token),
    __param(0, (0, graphql_1.Args)('loginInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_input_1.LoginInput]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], EmployeeResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.ResolveField)(() => job_entity_1.Job),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], EmployeeResolver.prototype, "job", null);
__decorate([
    (0, graphql_1.ResolveField)(() => location_entity_1.Location),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], EmployeeResolver.prototype, "location", null);
__decorate([
    (0, graphql_1.ResolveField)(() => salary_entity_1.Salary),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], EmployeeResolver.prototype, "salary", null);
__decorate([
    (0, graphql_1.ResolveField)(() => payband_entity_1.Payband),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_entity_1.Employee]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], EmployeeResolver.prototype, "payband", null);
exports.EmployeeResolver = EmployeeResolver = __decorate([
    (0, graphql_1.Resolver)(() => employee_entity_1.Employee),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeeResolver);
//# sourceMappingURL=employee.resolver.js.map