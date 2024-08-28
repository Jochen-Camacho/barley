import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Department } from '../../department/entities/department.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Job } from '../../job/entities/job.entity';

@Entity()
export class Payband {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Department, (department) => department.paybands)
  department: Department;

  @Column()
  departmentId: number;

  @OneToOne(() => Job, (job) => job.payband)
  @JoinColumn({ name: 'jobId' })
  job: Job;

  @OneToMany(() => Employee, (employee) => employee.payband)
  employees: Employee[];
}
