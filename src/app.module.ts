import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BootstrapModule } from './bootstrap';
import { UsersModule } from './users';

@Module({
  imports: [BootstrapModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
