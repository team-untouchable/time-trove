import { NestFactory } from '@nestjs/core';
import { AppConfigService } from '@src/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfigService);
  await app.listen(appConfig.port);
}
bootstrap();
