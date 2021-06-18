import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';

import { SeederModule } from './promo-services/seeders/seeder.module';
import { SeederService } from './promo-services/seeders/services/seeder.service';
import { AppModule } from './app.module';

/**
 * 
 * @param seed 
 */
async function seedingDbAsync(seed: boolean = false) {
  if (seed) {
    NestFactory.createApplicationContext(SeederModule)
      .then(async appContext => {
        const logger = appContext.get(Logger);
        const seeder = appContext.get<SeederService>(SeederService);
        await seeder.seedAsync()
          .then(() => logger.debug('Seeding complete!'))
          .catch(error => {
            logger.error('Seeding failed!');
            throw error;
          })
          .finally(() => appContext.close());
      })
      .catch(error => {
        throw error;
      });
  }
}

const port = process.env.PORT;
async function bootstrap() {
  const seed: boolean = false;
  await seedingDbAsync(seed);

  if (!seed) {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
      .setTitle('Pomo Code Manager API')
      .setDescription('To manage promo codes for a user.')
      .setVersion('1.0')
      .addTag('Promo Code Manager')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.use(helmet());
    app.enableCors();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true
      })
    );

    await app.listen(port, '0.0.0.0', () => {
      Logger.log(`Server started running on http://localhost:${port}/api`, 'Bootstrap');
    });
  }
}

bootstrap();