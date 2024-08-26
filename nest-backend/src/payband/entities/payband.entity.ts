import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Department } from '../../department/entities/department.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Job } from '../../job/entities/job.entity';

@ObjectType()
@Entity()
export class Payband {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Department)
  @ManyToOne(() => Department, (department) => department.paybands)
  department: Department;

  @Field(() => Int)
  @Column()
  departmentId: number;

  @Field(() => Job)
  @OneToOne(() => Job, (job) => job.payband)
  job: Job;

  @Field(() => Int)
  @Column()
  jobId: number;

  @Field(() => [Employee], { nullable: true, defaultValue: [] })
  @ManyToOne(() => Employee, (employee) => employee.payband, { nullable: true })
  employees?: Employee[];
}
