import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { PaybandService } from './payband.service';
import { Payband } from './entities/payband.entity';
import { Job } from 'src/job/entities/job.entity';
import { Department } from 'src/department/entities/department.entity';
import { Employee } from 'src/employee/entities/employee.entity';

@Resolver(() => Payband)
export class PaybandResolver {
  constructor(private readonly paybandService: PaybandService) {}

  @Query(() => [Payband])
  allPayBands() {
    return this.paybandService.findAll();
  }

  @ResolveField(() => Job)
  async job(@Parent() payband: Payband): Promise<Job> {
    return this.paybandService.getJob(payband.jobId);
  }

  @ResolveField(() => Department)
  async department(@Parent() payband: Payband): Promise<Department> {
    return this.paybandService.getDepartment(payband.departmentId);
  }

  @ResolveField(() => [Employee])
  async employees(@Parent() payband: Payband): Promise<Employee[]> {
    return this.paybandService.getEmployees(payband.id);
  }
}
