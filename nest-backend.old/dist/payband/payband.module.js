"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaybandModule = void 0;
const common_1 = require("@nestjs/common");
const payband_service_1 = require("./payband.service");
const payband_resolver_1 = require("./payband.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const payband_entity_1 = require("./entities/payband.entity");
const job_entity_1 = require("src/job/entities/job.entity");
const department_entity_1 = require("src/department/entities/department.entity");
const employee_entity_1 = require("src/employee/employee.entity");
let PaybandModule = class PaybandModule {
};
exports.PaybandModule = PaybandModule;
exports.PaybandModule = PaybandModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([payband_entity_1.Payband, job_entity_1.Job, department_entity_1.Department, employee_entity_1.Employee])],
        providers: [payband_resolver_1.PaybandResolver, payband_service_1.PaybandService],
        exports: [payband_service_1.PaybandService],
    })
], PaybandModule);
//# sourceMappingURL=payband.module.js.map