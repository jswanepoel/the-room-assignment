import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserBonusEntity } from './entities/user-bonus.entity';

/**
 * 
 */
@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([UserBonusEntity])
    ],
    controllers: [],
    providers: [],
    exports: []
})
export class UserBonusModule {}