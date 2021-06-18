import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

import { PromoServiceEntity } from '../../entities/promo-service.entity';
import { PromoServiceBuilderService } from '../builders/services/promo-service-builder.service';
import { PromoService } from '../../entities/promo-service.interface';

/**
 * Service dealing with pomo service based operations.
 *
 * @class
 */
@Injectable()
export class PromoServiceSeederService {
    /**
     * Create an instance of the PromoServiceSeederService class.
     *
     * @constructs
     *
     * @param {Repository<PromoServiceEntity>} promoServiceRepository
     */
    constructor(
        @InjectRepository(PromoServiceEntity)
        private readonly promoServiceRepository: Repository<PromoServiceEntity>,
        private readonly promoSericeBuilderService: PromoServiceBuilderService) {
    }

    /**
     * Seed all PromoServices.
     *
     * @function
     */
    public async createAsync(): Promise<Promise<PromoServiceEntity>[]> {
        return (await (this.promoSericeBuilderService
            .promoServices(1000)))
            .map(async (promoService: PromoService) => {
                return await this.promoServiceRepository
                    .findOne({ name: promoService.name })
                    .then(async (dbPromoService: PromoServiceEntity) => {
                        /**
                         * Do not create an already present PromoService if it exist.
                         */
                        if (dbPromoService) {
                            return Promise.resolve(null);
                        }

                        const entity = plainToClass(PromoServiceEntity, promoService);
                        let result = this.promoServiceRepository.insert(entity);
                        return Promise.resolve(result);
                    })
                    .catch(error => Promise.reject(error));
            });
    }
}