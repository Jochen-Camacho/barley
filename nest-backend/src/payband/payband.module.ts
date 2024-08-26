import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaybandService } from './payband.service';
import { PaybandResolver } from './payband.resolver';
import { Payband } from './entities/payband.entity';
import { Job } from 'src/job/entities/job.entity';
import { Department } from 'src/department/entities/department.entity';
import { Employee } from 'src/employee/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payband, Job, Department, Employee])],
  providers: [PaybandResolver, PaybandService],
  exports: [PaybandService],
})
export class PaybandModule {}
