import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { PromoServiceService } from "src/promo-services/services/promo-service.service";
import { PromoServiceByNameQuery } from "../promo-service-by-name.query";

/**
 * 
 */
@QueryHandler(PromoServiceByNameQuery)
export class PromoServiceByNameQueryHandler implements IQueryHandler<PromoServiceByNameQuery> {
    /**
     * 
     * @param service 
     */
    constructor(
        private readonly service: PromoServiceService) {
    }

    /**
     * 
     * @param query 
     * @returns 
     */
    public async execute(query: PromoServiceByNameQuery): Promise<any> {
        return await this.service.findByNameAsync(query.request)
    }
}