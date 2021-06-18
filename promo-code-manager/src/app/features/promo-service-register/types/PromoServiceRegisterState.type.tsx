import { IPromoService } from '../../../components/promo-service/models/PromoService.interface';
import { IPromoServiceMeta } from '../../../components/promo-service/models/PromoServiceMeta.interface';

/**
 * 
 */
export type PromoServiceRegisterState = {
    promoServices: IPromoService[];
    promoServiceMeta: IPromoServiceMeta;
    nextPage: number;
    hasMore: boolean;
}