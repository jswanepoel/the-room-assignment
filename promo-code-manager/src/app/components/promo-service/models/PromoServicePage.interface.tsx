import { IPromoService } from "./PromoService.interface";
import { IPromoServiceMeta } from "./PromoServiceMeta.interface";

export interface IPromoServicePage {
    promoServices: IPromoService[];
    promoServiceMeta: IPromoServiceMeta;

}