import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { SwaggerDocumentOptions } from '@nestjs/swagger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from '@src/config';
import { AppModule } from './app.module';
import { TransformResponseInterceptor } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfigService);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  const swaggerConfig = new DocumentBuilder()
    .setTitle(`${appConfig.name} example`)
    .setDescription(`${appConfig.name}에서 사용할 수 있는 api에 대한 문서`)
    .setVersion('1.0')
    .build();
  // const swaggerDocumentOption: SwaggerDocumentOptions = {extraModels: []};
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(appConfig.port);
}
bootstrap();
