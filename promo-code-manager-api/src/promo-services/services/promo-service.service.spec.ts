import { Test, TestingModule } from '@nestjs/testing';
import { PromoServiceService } from './promo-service.service';

describe('PromoServiceService', () => {
  let service: PromoServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromoServiceService],
    }).compile();

    service = module.get<PromoServiceService>(PromoServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
