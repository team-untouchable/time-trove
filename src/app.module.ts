import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';
import { BootstrapModule } from './bootstrap';
import { UsersModule } from './users';
import { EventModule } from './event/events.module';

@Module({
  imports: [BootstrapModule, AuthModule, UsersModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
