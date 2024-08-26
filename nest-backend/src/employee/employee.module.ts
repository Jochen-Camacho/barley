import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';
import { JobModule } from '../job/job.module';
import { LocationModule } from '../location/location.module';
import { SalaryModule } from '../salary/salary.module';
import { PaybandModule } from '../payband/payband.module';
import { Employee } from './entities/employee.entity';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    JwtModule.register({
      secret: 'secret',
    }),
    JobModule,
    LocationModule,
    SalaryModule,
    PaybandModule,
    ImageModule,
  ],
  providers: [EmployeeService, EmployeeResolver],
})
export class EmployeeModule {}
