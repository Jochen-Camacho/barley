"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModule = void 0;
const common_1 = require("@nestjs/common");
const employee_service_1 = require("./employee.service");
const employee_resolver_1 = require("./employee.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const employee_entity_1 = require("./employee.entity");
const job_module_1 = require("../job/job.module");
const location_module_1 = require("../location/location.module");
const salary_module_1 = require("../salary/salary.module");
const payband_module_1 = require("../payband/payband.module");
const jwt_1 = require("@nestjs/jwt");
const image_module_1 = require("../image/image.module");
let EmployeeModule = class EmployeeModule {
};
exports.EmployeeModule = EmployeeModule;
exports.EmployeeModule = EmployeeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([employee_entity_1.Employee]),
            jwt_1.JwtModule.register({
                secret: 'secret',
            }),
            job_module_1.JobModule,
            location_module_1.LocationModule,
            salary_module_1.SalaryModule,
            payband_module_1.PaybandModule,
            image_module_1.ImageModule,
        ],
        providers: [employee_service_1.EmployeeService, employee_resolver_1.EmployeeResolver],
    })
], EmployeeModule);
//# sourceMappingURL=employee.module.js.map