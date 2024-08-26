import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobInput } from './dto/create-job.input';
import { DepartmentService } from 'src/department/department.service';
import { PaybandService } from 'src/payband/payband.service';
import { Department } from 'src/department/entities/department.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    private departmentService: DepartmentService,
    private paybandService: PaybandService,
  ) {}

  async create(createJobInput: CreateJobInput): Promise<Job> {
    // Retrieve the department based on the input
    const department = await this.departmentService.findByTitle(
      createJobInput.department,
    );

    // Create and save the job entity
    const job = await this.jobRepository.save(
      this.jobRepository.create({
        ...createJobInput,
        department,
        departmentId: department.id,
      }),
    );

    console.log(job);

    // Create the associated payband for the job
    const payband = await this.paybandService.create({
      department,
      departmentId: department.id,
      job,
      jobId: job.id,
    });

    job.payband = payband;

    return this.jobRepository.save(job);
  }

  async findAll(): Promise<Job[]> {
    return this.jobRepository.find();
  }

  async findByTitle(title: string): Promise<Job> {
    return this.jobRepository.findOneByOrFail({ title });
  }

  async findById(id: number): Promise<Job> {
    return this.jobRepository.findOneByOrFail({ id });
  }

  async getDepartment(id: number): Promise<Department> {
    return this.departmentService.findById(id);
  }
}
