import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Job } from '../../job/entities/job.entity';
import { Payband } from '../../payband/entities/payband.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Job, (job) => job.department, { nullable: true })
  jobs?: Job[];

  @OneToMany(() => Payband, (payband) => payband.department, { nullable: true })
  paybands?: Payband[];
}
