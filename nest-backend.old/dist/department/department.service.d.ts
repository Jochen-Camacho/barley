import { CreateDepartmentInput } from './dto/create-department.input';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
export declare class DepartmentService {
    private departmentRepo;
    constructor(departmentRepo: Repository<Department>);
    create(createDepartmentInput: CreateDepartmentInput): any;
    findAll(): any;
    findByTitle(title: string): any;
    findById(id: number): any;
}
