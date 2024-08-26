import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { Job } from 'src/job/entities/job.entity';
import { Location } from 'src/location/entities/location.entity';
import { Salary } from 'src/salary/entities/salary.entity';
import { Payband } from 'src/payband/entities/payband.entity';
import { LoginInput } from './dto/login.input';
import { Token } from './dto/token.output';
import { AllEmployeeArgs } from './dto/all-employee-args.input';
import { ChangeRoleInput } from './dto/change-role.input';
import { FileUploadInput } from './dto/file-upload.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => [Employee])
  allEmployees(
    @Args('allEmployeeArgs') allEmployeeArgs: AllEmployeeArgs,
  ): Promise<Employee[]> {
    return this.employeeService.findAll(allEmployeeArgs);
  }

  @Query(() => Number)
  maxEmployeeBaseSalary(): Promise<number> {
    return this.employeeService.findMaxBaseSalary();
  }

  @Query(() => Employee)
  @UseGuards(AuthGuard)
  getLoggedInUser(@Context() context: any): Promise<Employee> {
    return this.employeeService.findById(context.userId);
  }

  @Mutation(() => Employee)
  addEmployee(
    @Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput,
  ): Promise<Employee> {
    return this.employeeService.createEmployee(createEmployeeInput);
  }

  @Mutation(() => Employee)
  changeRole(
    @Args('changeRoleInput') changeRoleInput: ChangeRoleInput,
  ): Promise<Employee> {
    return this.employeeService.changeRole(changeRoleInput);
  }

  @Mutation(() => Employee)
  uploadImage(
    @Args('fileUploadInput') fileUploadInput: FileUploadInput,
  ): Promise<Employee> {
    return this.employeeService.uploadImage(fileUploadInput);
  }

  @Mutation(() => Token)
  login(@Args('loginInput') loginInput: LoginInput): Promise<Token> {
    return this.employeeService.login(loginInput);
  }

  @ResolveField(() => Job)
  job(@Parent() employee: Employee): Promise<Job> {
    return this.employeeService.getJob(employee.jobId);
  }

  @ResolveField(() => Location)
  location(@Parent() employee: Employee): Promise<Location> {
    return this.employeeService.getLocation(employee.locationId);
  }

  @ResolveField(() => Salary)
  salary(@Parent() employee: Employee): Promise<Salary> {
    return this.employeeService.getSalary(employee.salaryId);
  }

  @ResolveField(() => Payband)
  payband(@Parent() employee: Employee): Promise<Payband> {
    return this.employeeService.getPayband(employee.paybandId);
  }
}
