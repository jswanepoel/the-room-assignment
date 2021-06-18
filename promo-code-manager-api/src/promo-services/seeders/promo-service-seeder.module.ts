import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PromoServiceEntity } from '../entities/promo-service.entity';
import { PromoServiceBuilderService } from './builders/services/promo-service-builder.service';
import { PromoServiceSeederService } from './services/promo-service-seeder.service';

/**
 * 
 * @module
 */
@Module({
    imports: [
        TypeOrmModule.forFeature([PromoServiceEntity])
    ],
    providers: [
        PromoServiceSeederService,
        PromoServiceBuilderService
    ],
    exports: [
        PromoServiceSeederService,
        PromoServiceBuilderService
    ],
})
export class PromoServiceSeederModule {
}