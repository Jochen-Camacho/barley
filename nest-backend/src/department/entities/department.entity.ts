import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Job } from '../../job/entities/job.entity';
import { Payband } from '../../payband/entities/payband.entity';

@ObjectType()
@Entity()
export class Department {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field(() => [Job], { nullable: true })
  @OneToMany(() => Job, (job) => job.department, { nullable: true })
  jobs?: Job[];

  @Field(() => [Payband], { nullable: true })
  @OneToMany(() => Payband, (payband) => payband.department, { nullable: true })
  paybands?: Payband[];
}
