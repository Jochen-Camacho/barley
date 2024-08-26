import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobService } from './job.service';
import { JobResolver } from './job.resolver';
import { Job } from './entities/job.entity';
import { DepartmentModule } from '../department/department.module';
import { PaybandModule } from '../payband/payband.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Job]),
    DepartmentModule,
    forwardRef(() => PaybandModule),
  ],
  providers: [JobResolver, JobService],
  exports: [JobService],
})
export class JobModule {}
