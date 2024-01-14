import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppConfigService } from '@src/config';
import { AppModule } from './app.module';
import { TransformResponseInterceptor } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfigService);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  await app.listen(appConfig.port);
}
bootstrap();
