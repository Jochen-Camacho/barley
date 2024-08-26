import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payband } from './entities/payband.entity';
import { Job } from 'src/job/entities/job.entity';
import { Department } from 'src/department/entities/department.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import { CreatePaybandInput } from './dto/create-payband.input';

@Injectable()
export class PaybandService {
  constructor(
    @InjectRepository(Payband)
    private readonly paybandRepository: Repository<Payband>,

    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,

    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create(createPaybandInput: CreatePaybandInput): Promise<Payband> {
    const payband = this.paybandRepository.create({
      department: createPaybandInput.department,
      departmentId: createPaybandInput.departmentId,
      job: createPaybandInput.job,
      jobId: createPaybandInput.jobId,
    });
    return this.paybandRepository.save(payband);
  }

  async findAll(): Promise<Payband[]> {
    return this.paybandRepository.find();
  }

  async findById(id: number): Promise<Payband> {
    return this.paybandRepository.findOneByOrFail({ id });
  }

  async findByJobId(id: number): Promise<Payband> {
    return this.paybandRepository.findOneByOrFail({ job: { id } });
  }

  async getJob(id: number): Promise<Job> {
    return this.jobRepository.findOneByOrFail({ id });
  }

  async getDepartment(id: number): Promise<Department> {
    return this.departmentRepository.findOneByOrFail({ id });
  }

  async getEmployees(id: number): Promise<Employee[]> {
    return this.employeeRepository.find({ where: { paybandId: id } });
  }
}
