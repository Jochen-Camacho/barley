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
exports.JobResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const job_service_1 = require("./job.service");
const job_entity_1 = require("./entities/job.entity");
const create_job_input_1 = require("./dto/create-job.input");
let JobResolver = class JobResolver {
    constructor(jobService) {
        this.jobService = jobService;
    }
    addJob(createJobInput) {
        console.log(createJobInput);
        return this.jobService.create(createJobInput);
    }
    department(job) {
        return this.jobService.getDepartment(job.departmentId);
    }
    allJobs() {
        return this.jobService.findAll();
    }
    findByTitle(title) {
        return this.jobService.findByTitle(title);
    }
};
exports.JobResolver = JobResolver;
__decorate([
    (0, graphql_1.Mutation)(() => job_entity_1.Job),
    __param(0, (0, graphql_1.Args)('createJobInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_job_input_1.CreateJobInput]),
    __metadata("design:returntype", void 0)
], JobResolver.prototype, "addJob", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_entity_1.Job]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], JobResolver.prototype, "department", null);
__decorate([
    (0, graphql_1.Query)(() => [job_entity_1.Job]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], JobResolver.prototype, "allJobs", null);
__decorate([
    (0, graphql_1.Query)(() => job_entity_1.Job),
    __param(0, (0, graphql_1.Args)('title', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobResolver.prototype, "findByTitle", null);
exports.JobResolver = JobResolver = __decorate([
    (0, graphql_1.Resolver)(() => job_entity_1.Job),
    __metadata("design:paramtypes", [job_service_1.JobService])
], JobResolver);
//# sourceMappingURL=job.resolver.js.map