import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigModule, DatabaseConfigService } from '@src/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [databaseConfigModule],
      inject: [DatabaseConfigService],
      useFactory: async (config: DatabaseConfigService) => ({
        type: 'postgres',
        host: config.host,
        port: config.port,
        username: config.user,
        password: config.password,
        database: config.database,
        ssl: true,
        entities: [],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseBootstrapModule {}
