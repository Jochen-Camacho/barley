import { DepartmentService } from './department.service';
import { CreateDepartmentInput } from './dto/create-department.input';
export declare class DepartmentResolver {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    addDepartment(createDepartmentInput: CreateDepartmentInput): any;
    allDepartments(): any;
}
