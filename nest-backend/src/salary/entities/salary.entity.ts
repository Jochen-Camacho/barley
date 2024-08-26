import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';

@ObjectType()
@Entity()
export class Salary {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  base: number;

  @Field(() => Int)
  @Column()
  variable: number;

  @Field(() => Int)
  @Column()
  bonus: number;

  @Field(() => Int)
  @Column()
  benefits: number;

  @Field(() => Int)
  @Column()
  equity: number;

  @Field(() => Employee)
  @OneToOne(() => Employee, (employee) => employee.salary)
  @JoinColumn()
  employee: Employee;
}
