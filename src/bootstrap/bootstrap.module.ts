import { Module } from '@nestjs/common';
import { AppConfigModule } from '@src/config';
import { DatabaseBootstrapModule } from './database';

@Module({
  imports: [AppConfigModule, DatabaseBootstrapModule],
})
export class BootstrapModule {}
