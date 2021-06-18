import { IQuery } from '@nestjs/cqrs';
import { PromoServiceByNameRequest } from '../models/promo-service-by-name.request';

/**
 * 
 */
export class PromoServiceByNameQuery  implements IQuery {
    /**
     * 
     * @param request 
     */
    constructor(
        public readonly request: PromoServiceByNameRequest) {
    }
}