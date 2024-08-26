import { Salary } from './entities/salary.entity';
import { Repository } from 'typeorm';
import { CreateSalaryInput } from './dto/create-salary.input';
export declare class SalaryService {
    private salaryRepository;
    constructor(salaryRepository: Repository<Salary>);
    findById(id: number): unknown;
    createSalary(ceateSalaryInput: CreateSalaryInput): unknown;
}
