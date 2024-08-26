import { Test, TestingModule } from '@nestjs/testing';
import { SalaryResolver } from './salary.resolver';
import { SalaryService } from './salary.service';

describe('SalaryResolver', () => {
  let resolver: SalaryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalaryResolver, SalaryService],
    }).compile();

    resolver = module.get<SalaryResolver>(SalaryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
