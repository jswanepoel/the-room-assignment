import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { PromoServiceEntity } from '../../promo-services/entities/promo-service.entity';
import { UserEntity } from '../../users/enities/user.entity';

/**
 * 
 */
@Entity()
export class UserBonusEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    /**
     * 
     */
    @ManyToOne(() => UserEntity, user => user.bonuses)
    @JoinColumn()
    public user: UserEntity;

    @OneToOne(() => PromoServiceEntity, promo => promo.bonus)
    @JoinColumn()
    public promoService: PromoServiceEntity;
}