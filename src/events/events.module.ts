import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthConfigModule } from '@src/config';
import { User } from '@src/users/entities';
import { Event } from './entities';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [AuthConfigModule, TypeOrmModule.forFeature([Event, User])],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
