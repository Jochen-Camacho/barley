import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { EmployeeService } from 'src/employee/employee.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly employeeService: EmployeeService,
  ) {}

  @Post('login')
  async loginUser(@Req() req: Request) {
    console.log('logging in');
    const { input } = req.body;
    const { loginInput } = input;
    return this.employeeService.login(loginInput);
  }

  @Post('user')
  @UseGuards(AuthGuard)
  async getLoggedInUser(@Req() req: Request) {
    const id = req.userId;
    const user = await this.employeeService.findById(id);
    return user;
  }
}
