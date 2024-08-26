import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Salary } from './entities/salary.entity';
import { CreateSalaryInput } from './dto/create-salary.input';

@Injectable()
export class SalaryService {
  constructor(
    @InjectRepository(Salary)
    private readonly salaryRepository: Repository<Salary>,
  ) {}

  async findById(id: number): Promise<Salary> {
    return this.salaryRepository.findOneByOrFail({ id });
  }

  async createSalary(createSalaryInput: CreateSalaryInput): Promise<Salary> {
    const salary = this.salaryRepository.create(createSalaryInput);
    return this.salaryRepository.save(salary);
  }
}
