import { JobService } from './job.service';
import { Job } from './entities/job.entity';
import { CreateJobInput } from './dto/create-job.input';
import { Department } from 'src/department/entities/department.entity';
export declare class JobResolver {
    private readonly jobService;
    constructor(jobService: JobService);
    addJob(createJobInput: CreateJobInput): unknown;
    department(job: Job): Promise<Department>;
    allJobs(): unknown;
    findByTitle(title: string): unknown;
}
