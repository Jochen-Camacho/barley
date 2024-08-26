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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const job_entity_1 = require("./entities/job.entity");
const typeorm_2 = require("typeorm");
const department_service_1 = require("../department/department.service");
const payband_service_1 = require("../payband/payband.service");
let JobService = class JobService {
    constructor(jobRepository, departmentService, paybandService) {
        this.jobRepository = jobRepository;
        this.departmentService = departmentService;
        this.paybandService = paybandService;
    }
    async create(createJobInput) {
        const department = await this.departmentService.findByTitle(createJobInput.department);
        const job = await this.jobRepository.save(this.jobRepository.create({
            ...createJobInput,
            department,
            departmentId: department.id,
        }));
        console.log(job);
        const payband = await this.paybandService.create({
            department,
            departmentId: department.id,
            job,
            jobId: job.id,
        });
        console.log(payband);
        job.payband = payband;
        return job;
    }
    async findAll() {
        return this.jobRepository.find();
    }
    async findByTitle(title) {
        return this.jobRepository.findOneByOrFail({ title });
    }
    async findById(id) {
        return this.jobRepository.findOneByOrFail({ id });
    }
    async getDepartment(id) {
        return this.departmentService.findById(id);
    }
};
exports.JobService = JobService;
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(job_entity_1.Job)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, department_service_1.DepartmentService,
        payband_service_1.PaybandService])
], JobService);
//# sourceMappingURL=job.service.js.map