import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { appConfiguration } from './app-configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration],
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
