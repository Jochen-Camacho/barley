import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Department } from '../../department/entities/department.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Payband } from '../../payband/entities/payband.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  level: number;

  @OneToMany(() => Employee, (employee) => employee.job)
  employees?: Employee[];

  @ManyToOne(() => Department, (department) => department.jobs)
  department: Department;

  @Column()
  departmentId: number;

  @OneToOne(() => Payband, (payband) => payband.job)
  payband: Payband;
}
