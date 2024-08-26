import { Test, TestingModule } from '@nestjs/testing';
import { PaybandService } from './payband.service';

describe('PaybandService', () => {
  let service: PaybandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaybandService],
    }).compile();

    service = module.get<PaybandService>(PaybandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
