import { Employee } from 'src/employee/employee.entity';
export declare class Salary {
    id: number;
    base: number;
    variable: number;
    bonus: number;
    benefits: number;
    equity: number;
    employee: Employee;
}
