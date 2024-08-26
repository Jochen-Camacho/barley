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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const employee_entity_1 = require("./employee.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const job_service_1 = require("../job/job.service");
const location_service_1 = require("../location/location.service");
const salary_service_1 = require("../salary/salary.service");
const payband_service_1 = require("../payband/payband.service");
const jwt_1 = require("@nestjs/jwt");
const token_output_1 = require("./dto/token-output");
const image_service_1 = require("../image/image.service");
const uuid_1 = require("uuid");
let EmployeeService = class EmployeeService {
    constructor(employeeRepository, jobService, locationService, salaryService, paybandService, jwtService, imageService) {
        this.employeeRepository = employeeRepository;
        this.jobService = jobService;
        this.locationService = locationService;
        this.salaryService = salaryService;
        this.paybandService = paybandService;
        this.jwtService = jwtService;
        this.imageService = imageService;
    }
    async findAll(allEmployeeArgs) {
        const query = this.employeeRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.job', 'job')
            .leftJoinAndSelect('job.department', 'department');
        if (allEmployeeArgs.job) {
            query.andWhere('job.title = :jobTitle', {
                jobTitle: allEmployeeArgs.job,
            });
        }
        if (allEmployeeArgs.department) {
            query.andWhere('department.title = :departmentTitle', {
                departmentTitle: allEmployeeArgs.department,
            });
        }
        if (allEmployeeArgs.level) {
            query.andWhere('job.level = :level', { level: allEmployeeArgs.level });
        }
        if (allEmployeeArgs.id) {
            query.andWhere('employee.id = :id', { id: allEmployeeArgs.id });
        }
        return query.getMany();
    }
    async findMaxBaseSalary() {
        const result = await this.employeeRepository.find({
            relations: ['salary'],
            order: { salary: { base: 'DESC' } },
        });
        return result[0].salary.base;
    }
    async findById(id) {
        return this.employeeRepository.findOneByOrFail({ id });
    }
    async createEmployee(createEmployeeInput) {
        const [job, location, salary] = await Promise.all([
            this.jobService.findByTitle(createEmployeeInput.job),
            this.locationService.findByCityAndCountry(createEmployeeInput.city, createEmployeeInput.country),
            this.salaryService.createSalary({
                base: createEmployeeInput.base,
                variable: createEmployeeInput.variable,
                benefits: createEmployeeInput.benefits,
                bonus: createEmployeeInput.bonus,
                equity: createEmployeeInput.equity,
            }),
        ]);
        const payband = await this.paybandService.findByJobId(job.id);
        const employee = this.employeeRepository.create({
            firstName: createEmployeeInput.firstName,
            lastName: createEmployeeInput.lastName,
            email: createEmployeeInput.email,
            jobId: job.id,
            job,
            locationId: location.id,
            location,
            salary,
            salaryId: salary.id,
            paybandId: payband.id,
            payband,
            image: 'https://barleybucket.s3.us-east-2.amazonaws.com/d11c3072-da4e-4898-8129-69153c3a784e_photo.jpg',
        });
        return this.employeeRepository.save(employee);
    }
    async changeRole(changeRoleInput) {
        const [employee, job] = await Promise.all([
            this.employeeRepository.findOneByOrFail({ id: changeRoleInput.id }),
            this.jobService.findById(changeRoleInput.jobId),
        ]);
        employee.jobId = job.id;
        return this.employeeRepository.save(employee);
    }
    async uploadImage(fileUploadInput) {
        const { mimetype, data, id } = fileUploadInput;
        const filename = (0, uuid_1.v4)() + '_photo.jpg';
        const base64Data = data.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        const [imageLink, employee] = await Promise.all([
            this.imageService.putImage(buffer, filename, mimetype),
            this.employeeRepository.findOneByOrFail({ id }),
        ]);
        employee.image = imageLink;
        return this.employeeRepository.save(employee);
    }
    async getJob(jobId) {
        return this.jobService.findById(jobId);
    }
    async getLocation(locationId) {
        return this.locationService.findById(locationId);
    }
    async getSalary(salaryId) {
        return this.salaryService.findById(salaryId);
    }
    async getPaybad(paybandId) {
        const payband = await this.paybandService.findById(paybandId);
        return payband;
    }
    async login(loginInput) {
        const user = await this.employeeRepository.findOne({
            where: { ...loginInput },
        });
        const userForToken = {
            id: user.id,
        };
        const token = this.jwtService.sign(userForToken);
        const tokenObj = new token_output_1.Token();
        tokenObj.token = token;
        return tokenObj;
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, job_service_1.JobService,
        location_service_1.LocationService,
        salary_service_1.SalaryService,
        payband_service_1.PaybandService, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, image_service_1.ImageService])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map