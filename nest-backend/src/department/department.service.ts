import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepo: Repository<Department>,
  ) {}

  // Create a new department
  create(createDepartmentInput: CreateDepartmentInput) {
    const department = this.departmentRepo.create(createDepartmentInput);
    return this.departmentRepo.save(department);
  }

  // Retrieve all departments
  findAll() {
    return this.departmentRepo.find();
  }

  // Retrieve a department by title
  findByTitle(title: string) {
    return this.departmentRepo.findOneByOrFail({ title });
  }

  // Retrieve a department by id
  findById(id: number) {
    return this.departmentRepo.findOneByOrFail({ id });
  }
}
