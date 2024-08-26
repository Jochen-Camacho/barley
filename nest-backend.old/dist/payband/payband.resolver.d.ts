import { PaybandService } from './payband.service';
import { Payband } from './entities/payband.entity';
import { Job } from 'src/job/entities/job.entity';
import { Department } from 'src/department/entities/department.entity';
import { Employee } from 'src/employee/employee.entity';
export declare class PaybandResolver {
    private readonly paybandService;
    constructor(paybandService: PaybandService);
    allPayBands(): unknown;
    job(payband: Payband): Promise<Job>;
    department(payband: Payband): Promise<Department>;
    employees(payband: Payband): Promise<Employee[]>;
}
