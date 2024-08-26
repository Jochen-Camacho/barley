import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';

@ObjectType()
@Entity()
export class Location {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  country: string;

  @Field(() => [Employee], { nullable: true })
  @OneToMany(() => Employee, (employee) => employee.location, {
    nullable: true,
  })
  employees?: Employee[];
}
