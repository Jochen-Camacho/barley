import { CreateJobInput } from './dto/create-job.input';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';
import { DepartmentService } from 'src/department/department.service';
import { PaybandService } from 'src/payband/payband.service';
export declare class JobService {
    private jobRepository;
    private departmentService;
    private paybandService;
    constructor(jobRepository: Repository<Job>, departmentService: DepartmentService, paybandService: PaybandService);
    create(createJobInput: CreateJobInput): unknown;
    findAll(): unknown;
    findByTitle(title: string): unknown;
    findById(id: number): unknown;
    getDepartment(id: number): unknown;
}
