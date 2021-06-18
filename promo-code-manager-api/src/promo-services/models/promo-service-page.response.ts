import { ApiProperty } from '@nestjs/swagger';
import { PromoServiceMetaResponse } from './promo-service-meta.response';
import { PromoServiceResponse } from './promo-service.response';


export class PromoServicePageResponse {
    @ApiProperty()
    public promoServices: PromoServiceResponse[];

    @ApiProperty()
    public metaData: PromoServiceMetaResponse;
}
