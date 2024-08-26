import { Test, TestingModule } from '@nestjs/testing';
import { PaybandResolver } from './payband.resolver';
import { PaybandService } from './payband.service';

describe('PaybandResolver', () => {
  let resolver: PaybandResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaybandResolver, PaybandService],
    }).compile();

    resolver = module.get<PaybandResolver>(PaybandResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
