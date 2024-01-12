import { Module } from '@nestjs/common';
import { BootstrapModule } from './bootstrap';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BootstrapModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
