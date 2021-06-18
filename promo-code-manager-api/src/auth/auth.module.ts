import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { SessionSerializer } from './session/session.serializer';

@Module({
    imports: [
        CqrsModule,
        UsersModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.register({
            secret: '@Nn_3-]I)K]H*w^>k5_BRJF/FfZ@+9jkWQ`E?eBQ])^.05-v&Gk/Wj-d[24QvNA', 
            signOptions: {
                expiresIn: 360,
            },
        }),
    ],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        JwtStrategy,
        SessionSerializer,
        ...CommandHandlers,
        ...QueryHandlers,
    ],
    exports: [
        PassportModule,
        JwtModule
    ],
})
export class AuthModule {}