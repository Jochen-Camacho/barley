import { InputType, Field, Int } from '@nestjs/graphql';
import { Department } from 'src/department/entities/department.entity';
import { Job } from 'src/job/entities/job.entity';

@InputType()
export class CreatePaybandInput {
  @Field(() => Int)
  departmentId: number;

  @Field(() => Department)
  department: Department;

  @Field(() => Int)
  jobId: number;

  @Field(() => Job)
  job: Job;
}
