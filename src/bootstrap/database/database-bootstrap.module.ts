import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigModule, DatabaseConfigService } from '@src/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      inject: [DatabaseConfigService],
      useFactory: async (config: DatabaseConfigService) => ({
        type: 'postgres',
        host: config.host,
        port: config.port,
        username: config.user,
        password: config.password,
        database: config.database,
        ssl: true,
        entities: [`${__dirname}/../../**/*.entity.{js,ts}`],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseBootstrapModule {}
