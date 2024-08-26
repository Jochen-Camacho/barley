import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Job } from '../../job/entities/job.entity';
import { Location } from '../../location/entities/location.entity';
import { Payband } from '../../payband/entities/payband.entity';
import { Salary } from '../../salary/entities/salary.entity';

@ObjectType()
@Entity()
export class Employee {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Field(() => Boolean)
  @Column({ default: false })
  admin: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image: string;

  @Field(() => Job)
  @ManyToOne(() => Job, (job) => job.employees)
  job: Job;

  @Field(() => Int)
  @Column()
  jobId: number;

  @Field(() => Location)
  @ManyToOne(() => Location, (location) => location.employees)
  location: Location;

  @Field(() => Int)
  @Column()
  locationId: number;

  @Field(() => Salary)
  @OneToOne(() => Salary, (salary) => salary.employee, { cascade: true })
  salary: Salary;

  @Field(() => Int)
  @Column()
  salaryId: number;

  @Field(() => Payband)
  @ManyToOne(() => Payband, (payband) => payband.employees)
  payband: Payband;

  @Field(() => Int)
  @Column()
  paybandId: number;
}
