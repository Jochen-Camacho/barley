import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { LoginInput } from './dto/login.input';
import { JwtService } from '@nestjs/jwt';
import { FileUploadInput } from './dto/file-upload.input';
import { Token } from './dto/token.output';
import { Job } from 'src/job/entities/job.entity';
import { Payband } from 'src/payband/entities/payband.entity';
import { Salary } from 'src/salary/entities/salary.entity';
import { Location } from 'src/location/entities/location.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { v4 as uuidv4 } from 'uuid';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    @InjectRepository(Salary)
    private salaryRepository: Repository<Salary>,
    @InjectRepository(Payband)
    private paybandRepository: Repository<Payband>,
    private jwtService: JwtService,
    private imageService: ImageService,
  ) {}

  async findById(id: number): Promise<Employee> {
    return this.employeeRepository.findOne({
      where: { id },
    });
  }
  async createEmployee(createEmployeeInput: CreateEmployeeInput) {
    const location = await this.locationRepository.findOne({
      where: {
        city: createEmployeeInput.city,
        country: createEmployeeInput.country,
      },
    });
    const job = await this.jobRepository.findOneByOrFail({
      id: createEmployeeInput.jobId,
    });

    const salary = this.salaryRepository.create({
      base: createEmployeeInput.base,
      variable: createEmployeeInput.variable,
      benefits: createEmployeeInput.benefits,
      bonus: createEmployeeInput.bonus,
      equity: createEmployeeInput.equity,
    });

    const payband = await this.paybandRepository.findOne({
      relations: ['job'],
      where: {
        job: { id: createEmployeeInput.jobId },
        departmentId: job.departmentId,
      },
    });
    console.log(
      'Location: ',
      location,
      'Job: ',
      job,
      'Salary: ',
      salary,
      'Payband: ',
      payband,
    );

    const employee = this.employeeRepository.create({
      firstName: createEmployeeInput.firstName,
      lastName: createEmployeeInput.lastName,
      email: createEmployeeInput.email,
      admin: true,
      image:
        'https://barleybucket.s3.us-east-2.amazonaws.com/d11c3072-da4e-4898-8129-69153c3a784e_photo.jpg',
    });

    employee.location = location;
    employee.job = job;
    employee.payband = payband;
    employee.salary = salary;

    console.log('Employee: ', employee);

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

  async login(loginInput: LoginInput): Promise<Token> {
    const user = await this.employeeRepository.findOne({
      where: { ...loginInput },
    });
    console.log(user);
    const userForToken = { id: user.id };
    const token = this.jwtService.sign(userForToken);
    const tokenObj = new Token();
    tokenObj.token = token;
    return tokenObj;
  }

  async getMaxSalary() {
    const query = this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.salary', 'salary');

    query.select('MAX(salary.base)', 'max');

    return { salary: await query.getRawOne() };
  }
}
