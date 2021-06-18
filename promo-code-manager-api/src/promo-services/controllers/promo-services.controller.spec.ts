import { Test, TestingModule } from '@nestjs/testing';
import { PromoServicesController } from './promo-services.controller';

describe('PromoServicesController', () => {
  let controller: PromoServicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromoServicesController],
    }).compile();

    controller = module.get<PromoServicesController>(PromoServicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
