import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { JobService } from './job.service';
import { Job } from './entities/job.entity';
import { CreateJobInput } from './dto/create-job.input';
import { Department } from 'src/department/entities/department.entity';

@Resolver(() => Job)
export class JobResolver {
  constructor(private readonly jobService: JobService) {}

  @Mutation(() => Job)
  addJob(@Args('createJobInput') createJobInput: CreateJobInput): unknown {
    console.log(createJobInput);
    return this.jobService.create(createJobInput);
  }

  @ResolveField()
  department(@Parent() job: Job): Promise<Department> {
    return this.jobService.getDepartment(job.departmentId);
  }

  @Query(() => [Job])
  allJobs(): unknown {
    return this.jobService.findAll();
  }

  @Query(() => Job)
  findByTitle(@Args('title', { type: () => String }) title: string): unknown {
    return this.jobService.findByTitle(title);
  }
}
