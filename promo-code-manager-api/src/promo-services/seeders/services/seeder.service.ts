import { Injectable, Logger } from '@nestjs/common';

import { PromoServiceSeederService } from './promo-service-seeder.service';

/**
 * 
 */
@Injectable()
export class SeederService {
    /**
     * 
     * @param logger 
     * @param promoServiceSeederService 
     */
    constructor(
        private readonly logger: Logger,
        private readonly promoServiceSeederService: PromoServiceSeederService) {
    }

    /**
     * 
     */
    public async seedAsync() {
        await this.promoServicesAsync()
            .then(completed => {
                this.logger.debug('Successfuly completed seeding promo services...');
                Promise.resolve(completed);
            })
            .catch(error => {
                this.logger.error('Failed seeding promo services...');
                Promise.reject(error);
            });
    }

    /**
     * 
     * @returns 
     */
    public async promoServicesAsync(): Promise<boolean> {
        return await Promise.all(await this.promoServiceSeederService.createAsync())
            .then(createdPromoServices => {
                /**
                 * May alose make of the following this.logger.verbose('...');
                 */
                this.logger.debug(
                    `No. of PromoServices created: ${createdPromoServices
                        .filter(nullValueOrCreatedPromoService => nullValueOrCreatedPromoService)
                        .length}`,
                );
                return Promise.resolve(true);
            })
            .catch(error => Promise.reject(error));
    }
}