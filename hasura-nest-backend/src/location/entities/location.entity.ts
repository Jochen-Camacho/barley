import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column()
  country: string;

  @OneToMany(() => Employee, (employee) => employee.location, {
    nullable: true,
  })
  employees?: Employee[];
}
