import { Logger, Module } from '@nestjs/common';

import { SqliteDatabaseProviderModule } from '../../database/providers/sqlite-database-provider.module';
import { PromoServiceSeederModule } from './promo-service-seeder.module';
import { SeederService } from './services/seeder.service';

/**
 * Import and provide seeder moduls, services and a logger provider.
 *
 * @module
 */
@Module({
  imports: [
    SqliteDatabaseProviderModule,
    PromoServiceSeederModule
  ],
  providers: [
    SeederService,
    Logger
  ],
})
export class SeederModule {
}