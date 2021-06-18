import { Test, TestingModule } from '@nestjs/testing';
import { PromoServiceSeederService } from './promo-service-seeder.service';

describe('PromoServiceSeederService', () => {
  let service: PromoServiceSeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromoServiceSeederService],
    }).compile();

    service = module.get<PromoServiceSeederService>(PromoServiceSeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
