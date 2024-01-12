import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfigService } from './database-config.service';
import { databaseConfiguration } from './database-configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfiguration],
    }),
  ],
  providers: [ConfigService, DatabaseConfigService],
  exports: [ConfigService, DatabaseConfigService],
})
export class databaseConfigModule {}
