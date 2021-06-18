import { UserBonusEntity } from 'src/user-bonuses/entities/user-bonus.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PromoService } from './promo-service.interface';

/**
 * Entity Schema for PromoServices.
 *
 * @class
 */
@Entity({
    name: 'promo_service',
})
export class PromoServiceEntity implements PromoService {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({
        length: 64
    })
    public name: string;

    @Column({
        length: 256
    })
    public description: string;

    @Column({
        length: 25,
        unique: true        
    })
    public promoCode: string;

    @OneToOne(() => UserBonusEntity, bonus => bonus.promoService, {
        cascade: true
    })
    public bonus: UserBonusEntity;
}