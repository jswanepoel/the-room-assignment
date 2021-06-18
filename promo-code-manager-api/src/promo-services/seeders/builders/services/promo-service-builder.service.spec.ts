import { Test, TestingModule } from '@nestjs/testing';
import { PromoServiceBuilderService } from './promo-service-builder.service';

describe('PromoServiceBuilderService', () => {
  let service: PromoServiceBuilderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromoServiceBuilderService],
    }).compile();

    service = module.get<PromoServiceBuilderService>(PromoServiceBuilderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});