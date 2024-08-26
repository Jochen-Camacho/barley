import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Department } from '../../department/entities/department.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Payband } from '../../payband/entities/payband.entity';

@ObjectType()
@Entity()
export class Job {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field(() => Int)
  @Column()
  level: number;

  @Field(() => [Employee], { nullable: true })
  @OneToMany(() => Employee, (employee) => employee.job)
  employees?: Employee[];

  @Field(() => Department)
  @ManyToOne(() => Department, (department) => department.jobs)
  department: Department;

  @Field(() => Int)
  @Column()
  departmentId: number;

  @Field(() => Payband)
  @OneToOne(() => Payband, (payband) => payband.job)
  @JoinColumn()
  payband: Payband;
}
