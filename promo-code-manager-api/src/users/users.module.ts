import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './enities/user.entity';
import { UsersService } from './services/users.service';

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([UserEntity])
    ],
    controllers: [],
    providers: [
        UsersService
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule {}