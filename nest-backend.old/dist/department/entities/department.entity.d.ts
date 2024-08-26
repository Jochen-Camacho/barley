import { Job } from 'src/job/entities/job.entity';
import { Payband } from 'src/payband/entities/payband.entity';
export declare class Department {
    id: number;
    title: string;
    jobs?: Job[];
    paybands?: Payband[];
}
