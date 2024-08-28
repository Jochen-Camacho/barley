import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
    }),
    EmployeeModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
