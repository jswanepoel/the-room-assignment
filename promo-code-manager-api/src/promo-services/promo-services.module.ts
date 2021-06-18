import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserBonusEntity } from 'src/user-bonuses/entities/user-bonus.entity';
import { UserEntity } from 'src/users/enities/user.entity';

import { CommandHandlers } from './commands/handlers';
import { PromoServicesController } from './controllers/promo-services.controller';
import { PromoServiceEntity } from './entities/promo-service.entity';
import { QueryHandlers } from './queries/handlers';
import { PromoServiceService } from './services/promo-service.service';

/**
 * 
 */
@Module({
    imports: [
        CqrsModule,
        AuthModule,
        TypeOrmModule.forFeature([
            PromoServiceEntity,
            UserBonusEntity,
            UserEntity
        ])
    ],
    controllers: [
        PromoServicesController
    ],
    providers: [
        Logger,
        PromoServiceService,
        ...CommandHandlers,
        ...QueryHandlers,
    ],
    exports: [
        PromoServiceService
    ]
})
export class PromoServicesModule {
}