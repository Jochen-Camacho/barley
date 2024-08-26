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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaybandService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const payband_entity_1 = require("./entities/payband.entity");
const typeorm_2 = require("typeorm");
const job_entity_1 = require("src/job/entities/job.entity");
const department_entity_1 = require("src/department/entities/department.entity");
const employee_entity_1 = require("src/employee/employee.entity");
let PaybandService = class PaybandService {
    constructor(paybandRepository, jobRepository, employeeRepository, deparmentRepository) {
        this.paybandRepository = paybandRepository;
        this.jobRepository = jobRepository;
        this.employeeRepository = employeeRepository;
        this.deparmentRepository = deparmentRepository;
    }
    async create(createPaybandInput) {
        const payband = this.paybandRepository.create({
            department: createPaybandInput.department,
            departmentId: createPaybandInput.departmentId,
            job: createPaybandInput.job,
            jobId: createPaybandInput.jobId,
        });
        return this.paybandRepository.save(payband);
    }
    async findAll() {
        return this.paybandRepository.find();
    }
    async findById(id) {
        return this.paybandRepository.findOneByOrFail({ id });
    }
    async findByJobId(id) {
        return this.paybandRepository.findOneByOrFail({ job: { id } });
    }
    async getJob(id) {
        return this.jobRepository.findOneByOrFail({ id });
    }
    async getDepartment(id) {
        return this.deparmentRepository.findOneByOrFail({ id });
    }
    async getEmployees(id) {
        return this.employeeRepository.find({ where: { paybandId: id } });
    }
};
exports.PaybandService = PaybandService;
exports.PaybandService = PaybandService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payband_entity_1.Payband)),
    __param(1, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __param(2, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __param(3, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object])
], PaybandService);
//# sourceMappingURL=payband.service.js.map