import { IBonus } from "./Bonus.interace";

export interface PromoServiceProps {
    id: string;
    name: string;
    description: string;
    promoCode: string;
    bonus: IBonus
}