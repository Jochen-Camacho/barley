import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { Job } from 'src/job/entities/job.entity';
import { Location } from 'src/location/entities/location.entity';
import { Salary } from 'src/salary/entities/salary.entity';
import { Payband } from 'src/payband/entities/payband.entity';
import { LoginInput } from './dto/login-input';
import { Token } from './dto/token-output';
import { AllEmployeeArgs } from './dto/all-employee.input';
import { ChangeRoleInput } from './dto/change-role.input';
import { FileUploadInput } from './dto/file-upload.input';
export declare class EmployeeResolver {
    private employeeService;
    constructor(employeeService: EmployeeService);
    allEmployees(allEmployeeArgs: AllEmployeeArgs): Promise<Employee[]>;
    maxEmployeeBaseSalary(): Promise<number>;
    getLoggedInUser(context: any): Promise<Employee>;
    addEmployee(createEmployeeInput: CreateEmployeeInput): Promise<Employee>;
    changeRole(changeRoleInput: ChangeRoleInput): Promise<Employee>;
    uploadImage(fileUploadInput: FileUploadInput): Promise<Employee>;
    login(loginInput: LoginInput): Promise<Token>;
    job(employee: Employee): Promise<Job>;
    location(employee: Employee): Promise<Location>;
    salary(employee: Employee): Promise<Salary>;
    payband(employee: Employee): Promise<Payband>;
}
