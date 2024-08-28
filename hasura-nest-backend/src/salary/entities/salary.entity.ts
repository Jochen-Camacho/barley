import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';

@Entity()
export class Salary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  base: number;

  @Column()
  variable: number;

  @Column()
  bonus: number;

  @Column()
  benefits: number;

  @Column()
  equity: number;

  @OneToOne(() => Employee, (employee) => employee.salary)
  employee: Employee;
}
