import { Department } from 'src/department/entities/department.entity';
import { Employee } from 'src/employee/employee.entity';
import { Job } from 'src/job/entities/job.entity';
export declare class Payband {
    id: number;
    department: Department;
    departmentId: number;
    job: Job;
    jobId: number;
    employees?: Employee[];
}
