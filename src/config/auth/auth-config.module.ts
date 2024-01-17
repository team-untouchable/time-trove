import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthConfigService } from './auth-config.service';
import { authConfiguration } from './auth-configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfiguration],
    }),
  ],
  providers: [ConfigService, AuthConfigService],
  exports: [ConfigService, AuthConfigService],
})
export class AuthConfigModule {}
