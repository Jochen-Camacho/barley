import { Department } from 'src/department/entities/department.entity';
import { Job } from 'src/job/entities/job.entity';
export declare class CreatePaybandInput {
    departmentId: number;
    department: Department;
    jobId: number;
    job: Job;
}
