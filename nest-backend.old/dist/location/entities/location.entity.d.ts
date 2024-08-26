import { Employee } from 'src/employee/employee.entity';
export declare class Location {
    id: number;
    city: string;
    country: string;
    employees?: [Employee];
}
