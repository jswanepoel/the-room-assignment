import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../../users/enities/user.entity';
import { PromoServiceEntity } from '../../promo-services/entities/promo-service.entity';
import { UserBonusEntity } from '../../user-bonuses/entities/user-bonus.entity';

/**
 * 
 */
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'pomo-service-db.sqlite',
            entities: [
                PromoServiceEntity,
                UserEntity,
                UserBonusEntity
            ],
            synchronize: true,
        })
    ]
})
export class SqliteDatabaseProviderModule {
}