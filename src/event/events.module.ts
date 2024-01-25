import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthConfigModule } from '@src/config';
import { User, UsersModule } from '@src/users';
import { AuthModule } from '@src/auth';
import { Event } from './entities';
import { EventService } from './events.service';
import { EventController } from './events.controller';

@Module({
  imports: [
    // eslint-disable-next-line no-use-before-define
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    // eslint-disable-next-line no-use-before-define
    AuthConfigModule,
    TypeOrmModule.forFeature([Event, User]),
  ],
  providers: [EventService],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}
