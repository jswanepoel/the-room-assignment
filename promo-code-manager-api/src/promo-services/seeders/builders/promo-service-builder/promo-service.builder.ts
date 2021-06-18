import { internet, company, commerce } from 'faker';
import { generate } from 'voucher-code-generator';
import { plainToClass } from 'class-transformer';

import { PromoServiceEntity } from '../../../entities/promo-service.entity';
import { PromoServiceConcrete } from "../../../entities/promo-service.concrete";

/**
 * 
 */
export class PromoServiceBuilder {
    private _name: string;
    private _description: string;
    private _promoCode: string;

    /**
     * 
     */
    get serviceName(): string {
        return this._name;
    }

    /**
     * 
     */
    get description(): string {
        return this._description;
    }

    /**
     * 
     */
    get promoCode(): string {
        return this._promoCode;
    }

    /**
     * 
     * @returns 
     */
    public generateServiceName(): PromoServiceBuilder {
        const name: string = commerce.productName();
        this._name = name;
        return this;
    }

    /**
     * 
     * @returns 
     */
    public generateDescription(): PromoServiceBuilder {
        const description: string = commerce.productDescription();
        this._description = description;
        return this;
    }

    /**
     * 
     * @param year 
     * @returns 
     */
    public generatePromoCode(year: string): PromoServiceBuilder {
        const promoCode: string = generate({
            count: 1,
            prefix: 'promo-',
            postfix: `-${year}`
        }).shift();
        this._promoCode = promoCode === undefined ? 'promoCode' : promoCode;
        return this;
    }

    /**
     * 
     * @returns 
     */
    public build(): PromoServiceEntity  {
        const entity = plainToClass(PromoServiceEntity, new PromoServiceConcrete(this));
        return entity; 
    }
}