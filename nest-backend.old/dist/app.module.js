"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const employee_module_1 = require("./employee/employee.module");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const typeorm_1 = require("@nestjs/typeorm");
const department_module_1 = require("./department/department.module");
const job_module_1 = require("./job/job.module");
const location_module_1 = require("./location/location.module");
const payband_module_1 = require("./payband/payband.module");
const salary_module_1 = require("./salary/salary.module");
const image_module_1 = require("./image/image.module");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: 'schema.gql',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                database: 'postgres',
                port: 5432,
                host: 'localhost',
                username: 'postgres',
                password: 'mysecretpassword',
                synchronize: true,
                entities: ['dist/**/*.entity{.ts,.js}'],
            }),
            employee_module_1.EmployeeModule,
            department_module_1.DepartmentModule,
            job_module_1.JobModule,
            location_module_1.LocationModule,
            payband_module_1.PaybandModule,
            salary_module_1.SalaryModule,
            image_module_1.ImageModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map