import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from './department/department.module';
import { JobModule } from './job/job.module';
import { LocationModule } from './location/location.module';
import { PaybandModule } from './payband/payband.module';
import { SalaryModule } from './salary/salary.module';
import { ImageModule } from './image/image.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'postgres',
      port: 5432,
      host: 'localhost',
      username: 'postgres',
      password: 'mysecretpassword',
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    EmployeeModule,
    DepartmentModule,
    JobModule,
    LocationModule,
    PaybandModule,
    SalaryModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
