import { PromoServiceBuilder } from '../seeders/builders/promo-service-builder/promo-service.builder';

/**
 * 
 */
export class PromoServiceConcrete {
    public name: string;
    public description: string;
    public promoCode: string;

    /**
     * 
     * @param builder 
     */
    constructor(builder: PromoServiceBuilder) {
        this.name = builder.serviceName;
        this.description = builder.description;
        this.promoCode = builder.promoCode;
    }
}