import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthConfigModule, AuthConfigService } from '@src/config';
import { User } from './entities';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthConfigModule],
  providers: [UsersService, AuthConfigService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
