import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoreModule } from './core/core.module';
import { PromoServicesModule } from './promo-services/promo-services.module';
import { UsersModule } from './users/users.module';
import { UserBonusModule } from './user-bonuses/user-bonus.module';
import { SqliteDatabaseProviderModule } from './database/providers/sqlite-database-provider.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    
    AuthModule,
    PromoServicesModule, 
    UserBonusModule,
    UsersModule,
    CoreModule,
    SqliteDatabaseProviderModule,
  ],
})
export class AppModule {
}