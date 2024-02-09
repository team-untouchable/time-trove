import type { Provider } from '@nestjs/common';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';
import { BootstrapModule } from './bootstrap';
import { UsersModule } from './users';
import { EventsModule } from './events';
import { TransformResponseInterceptor } from './common';

const globalProviders: Provider[] = [
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      transform: true,
    }),
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: TransformResponseInterceptor,
  },
];

@Module({
  imports: [BootstrapModule, AuthModule, UsersModule, EventsModule],
  controllers: [AppController],
  providers: [...globalProviders, AppService],
})
export class AppModule {}
