import { Job } from 'src/job/entities/job.entity';
import { Location } from 'src/location/entities/location.entity';
import { Payband } from 'src/payband/entities/payband.entity';
import { Salary } from 'src/salary/entities/salary.entity';
export declare class Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    admin: boolean;
    image: string;
    job: Job;
    jobId: number;
    location: Location;
    locationId: number;
    salary: Salary;
    salaryId: number;
    payband: Payband;
    paybandId: number;
}
