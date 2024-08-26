import { Department } from 'src/department/entities/department.entity';
import { Employee } from 'src/employee/employee.entity';
import { Payband } from 'src/payband/entities/payband.entity';
export declare class Job {
    id: number;
    title: string;
    level: number;
    employees?: Employee[];
    department: Department;
    departmentId: number;
    payband: Payband;
}
