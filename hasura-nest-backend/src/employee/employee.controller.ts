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

    const result =
      await this.employeeService.createEmployee(createEmployeeInput);

    return result;
  }

  @Post('uploadImage')
  async uploadImage(@Req() req: Request) {
    const { input } = req.body;
    const { fileUploadInput } = input;

    const result = this.employeeService.uploadImage(fileUploadInput);

    return result;
  }

  @Post('maxSalary')
  async maxSalary() {
    return this.employeeService.getMaxSalary();
  }
}
