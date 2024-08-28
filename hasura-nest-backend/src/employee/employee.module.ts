import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { ImageModule } from 'src/image/image.module';
import { EmployeeController } from './employee.controller';
import { Location } from 'src/location/entities/location.entity';
import { Job } from 'src/job/entities/job.entity';
import { Salary } from 'src/salary/entities/salary.entity';
import { Payband } from 'src/payband/entities/payband.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, Location, Job, Salary, Payband]),
    JwtModule.register({
      secret: 'secret',
    }),
    ImageModule,
  ],
  providers: [EmployeeService],
  exports: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
