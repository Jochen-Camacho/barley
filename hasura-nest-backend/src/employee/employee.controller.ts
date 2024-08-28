import { Controller, Post, Req } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Request } from 'express';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async createEmployee(@Req() req: Request) {
    const { input } = req.body;
    const { createEmployeeInput } = input;

    console.log(createEmployeeInput);
    const result =
      await this.employeeService.createEmployee(createEmployeeInput);
    console.log(result);

    return result;
  }
}
