import { Query, Mutation, Args, Resolver } from '@nestjs/graphql';
import { Salary } from './entities/salary.entity';
import { CreateSalaryInput } from './dto/create-salary.input';
import { SalaryService } from './salary.service';

@Resolver(() => Salary)
export class SalaryResolver {
  constructor(private readonly salaryService: SalaryService) {}

  @Query(() => Salary)
  async getSalary(@Args('id') id: number): Promise<Salary> {
    return this.salaryService.findById(id);
  }

  @Mutation(() => Salary)
  async createSalary(
    @Args('createSalaryInput') createSalaryInput: CreateSalaryInput,
  ): Promise<Salary> {
    return this.salaryService.createSalary(createSalaryInput);
  }
}
