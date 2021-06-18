import { IBonus } from './Bonus.interace';

export interface IPromoService {
    id: string;
    name: string;
    description: string;
    promoCode: string;
    bonus: IBonus;
}

