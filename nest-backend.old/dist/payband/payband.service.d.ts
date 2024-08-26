import { CreatePaybandInput } from './dto/create-payband.input';
import { Payband } from './entities/payband.entity';
import { Repository } from 'typeorm';
import { Job } from 'src/job/entities/job.entity';
import { Department } from 'src/department/entities/department.entity';
import { Employee } from 'src/employee/employee.entity';
export declare class PaybandService {
    private paybandRepository;
    private jobRepository;
    private employeeRepository;
    private deparmentRepository;
    constructor(paybandRepository: Repository<Payband>, jobRepository: Repository<Job>, employeeRepository: Repository<Employee>, deparmentRepository: Repository<Department>);
    create(createPaybandInput: CreatePaybandInput): unknown;
    findAll(): unknown;
    findById(id: number): unknown;
    findByJobId(id: number): unknown;
    getJob(id: number): unknown;
    getDepartment(id: number): unknown;
    getEmployees(id: number): unknown;
}
