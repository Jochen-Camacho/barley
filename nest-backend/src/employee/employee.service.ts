import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { JobService } from 'src/job/job.service';
import { LocationService } from 'src/location/location.service';
import { SalaryService } from 'src/salary/salary.service';
import { PaybandService } from 'src/payband/payband.service';
import { LoginInput } from './dto/login.input';
import { JwtService } from '@nestjs/jwt';
import { AllEmployeeArgs } from './dto/all-employee-args.input';
import { ChangeRoleInput } from './dto/change-role.input';
import { ImageService } from 'src/image/image.service';
import { FileUploadInput } from './dto/file-upload.input';
import { Token } from './dto/token.output';
import { v4 as uuidv4 } from 'uuid';
import { Job } from 'src/job/entities/job.entity';
import { Payband } from 'src/payband/entities/payband.entity';
import { Salary } from 'src/salary/entities/salary.entity';
import { Location } from 'src/location/entities/location.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private jobService: JobService,
    private locationService: LocationService,
    private salaryService: SalaryService,
    private paybandService: PaybandService,
    private jwtService: JwtService,
    private imageService: ImageService,
  ) {}

  async findAll(allEmployeeArgs: AllEmployeeArgs): Promise<Employee[]> {
    const query = this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.job', 'job')
      .leftJoinAndSelect('job.department', 'department');

    if (allEmployeeArgs.job) {
      query.andWhere('job.title = :jobTitle', {
        jobTitle: allEmployeeArgs.job,
      });
    }
    if (allEmployeeArgs.department) {
      query.andWhere('department.title = :departmentTitle', {
        departmentTitle: allEmployeeArgs.department,
      });
    }
    if (allEmployeeArgs.level) {
      query.andWhere('job.level = :level', { level: allEmployeeArgs.level });
    }
    if (allEmployeeArgs.id) {
      query.andWhere('employee.id = :id', { id: allEmployeeArgs.id });
    }

    return query.getMany();
  }

  async findMaxBaseSalary(): Promise<number> {
    const result = await this.employeeRepository.find({
      relations: ['salary'],
      order: { salary: { base: 'DESC' } },
    });
    return result[0].salary.base;
  }

  async findById(id: number): Promise<Employee> {
    return this.employeeRepository.findOneByOrFail({ id });
  }

  async createEmployee(
    createEmployeeInput: CreateEmployeeInput,
  ): Promise<Employee> {
    const [job, location, salary] = await Promise.all([
      this.jobService.findByTitle(createEmployeeInput.job),
      this.locationService.findByCityAndCountry(
        createEmployeeInput.city,
        createEmployeeInput.country,
      ),
      this.salaryService.createSalary({
        base: createEmployeeInput.base,
        variable: createEmployeeInput.variable,
        benefits: createEmployeeInput.benefits,
        bonus: createEmployeeInput.bonus,
        equity: createEmployeeInput.equity,
      }),
    ]);

    const payband = await this.paybandService.findByJobId(job.id);

    const employee = this.employeeRepository.create({
      firstName: createEmployeeInput.firstName,
      lastName: createEmployeeInput.lastName,
      email: createEmployeeInput.email,
      jobId: job.id,
      job,
      locationId: location.id,
      location,
      salary,
      salaryId: salary.id,
      paybandId: payband.id,
      payband,
      image:
        'https://barleybucket.s3.us-east-2.amazonaws.com/d11c3072-da4e-4898-8129-69153c3a784e_photo.jpg',
    });

    return this.employeeRepository.save(employee);
  }

  async changeRole(changeRoleInput: ChangeRoleInput): Promise<Employee> {
    const [employee, job] = await Promise.all([
      this.employeeRepository.findOneByOrFail({ id: changeRoleInput.id }),
      this.jobService.findById(changeRoleInput.jobId),
    ]);

    employee.jobId = job.id;
    return this.employeeRepository.save(employee);
  }

  async uploadImage(fileUploadInput: FileUploadInput): Promise<Employee> {
    const { mimetype, data, id } = fileUploadInput;
    const filename = uuidv4() + '_photo.jpg';
    const base64Data = data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const [imageLink, employee] = await Promise.all([
      this.imageService.putImage(buffer, filename, mimetype),
      this.employeeRepository.findOneByOrFail({ id }),
    ]);

    employee.image = imageLink;
    return this.employeeRepository.save(employee);
  }

  async getJob(jobId: number): Promise<Job> {
    return this.jobService.findById(jobId);
  }

  async getLocation(locationId: number): Promise<Location> {
    return this.locationService.findById(locationId);
  }

  async getSalary(salaryId: number): Promise<Salary> {
    return this.salaryService.findById(salaryId);
  }

  async getPayband(paybandId: number): Promise<Payband> {
    return this.paybandService.findById(paybandId);
  }

  async login(loginInput: LoginInput): Promise<Token> {
    const user = await this.employeeRepository.findOne({
      where: { ...loginInput },
    });

    const userForToken = { id: user.id };
    const token = this.jwtService.sign(userForToken);

    const tokenObj = new Token();
    tokenObj.token = token;

    return tokenObj;
  }
}
