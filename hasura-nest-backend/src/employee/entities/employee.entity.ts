import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Job } from '../../job/entities/job.entity';
import { Location } from '../../location/entities/location.entity';
import { Payband } from '../../payband/entities/payband.entity';
import { Salary } from '../../salary/entities/salary.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ default: false })
  admin: boolean;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Job, (job) => job.employees)
  @JoinColumn({ name: 'jobId' })
  job: Job;

  @ManyToOne(() => Location, (location) => location.employees)
  @JoinColumn({ name: 'locationId' })
  location: Location;

  @OneToOne(() => Salary, (salary) => salary.employee, { cascade: true })
  @JoinColumn({ name: 'salaryId' })
  salary: Salary;

  @ManyToOne(() => Payband, (payband) => payband.employees)
  @JoinColumn({ name: 'paybandId' })
  payband: Payband;
}
