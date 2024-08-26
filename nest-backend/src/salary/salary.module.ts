import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaryService } from './salary.service';
import { SalaryResolver } from './salary.resolver';
import { Salary } from './entities/salary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Salary])],
  providers: [SalaryResolver, SalaryService],
  exports: [SalaryService],
})
export class SalaryModule {}
