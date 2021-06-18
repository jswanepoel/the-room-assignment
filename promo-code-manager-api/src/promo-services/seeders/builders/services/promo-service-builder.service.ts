import { Injectable } from '@nestjs/common';

import { PromoService } from '../../../entities/promo-service.interface';
import { PromoServiceBuilder } from '../promo-service-builder/promo-service.builder';

/**
 * 
 */
@Injectable()
export class PromoServiceBuilderService {
    /**
     * 
     * @param seeds 
     * @returns 
     */
    public async promoServices(seeds: number = 200): Promise<PromoService[]> {
        const promoServices: PromoService[] = [];
        for (let seed = 0; seed <= seeds; seed++) {
            promoServices.push(new PromoServiceBuilder()
                .generateServiceName()
                .generateDescription()
                .generatePromoCode('2021')
                .build())
        }
        return promoServices;
    }
}