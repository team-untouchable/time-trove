import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@src/users/entities';
import { AuthModule } from '@src/auth';
import { UsersModule } from '@src/users';
import { Event } from './entities';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Event, User]), UsersModule],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
