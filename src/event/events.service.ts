import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthConfigService } from '@src/config';
import { Repository } from 'typeorm';
import { UpdateUserDto, User } from '@src/users';
import type { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities';
import type { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    private authConfigService: AuthConfigService,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event: Event = this.eventsRepository.create(createEventDto);
    await this.eventsRepository.insert(event);
    return event;
  }

  findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  findOneById(id: string): Promise<Event | null> {
    return this.eventsRepository.findOneBy({ id });
  }

  findOneByUserId(userid: string): Promise<Event[] | null> {
    return this.eventsRepository.find({
      where: {
        user_id: userid,
      },
    });
  }

  findOneByTitle(userid: string, title: string): Promise<Event | null> {
    return this.eventsRepository.findOne({
      where: {
        user_id: userid,
        title,
      },
    });
  }

  findOneByStartedAt(userid: string, startedat: Date): Promise<Event | null> {
    return this.eventsRepository.findOne({
      where: {
        user_id: userid,
        started_at: startedat,
      },
    });
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    await this.eventsRepository.update(id, updateEventDto);
    return this.findOneById(id);
  }

  async remove(id: string): Promise<void> {
    await this.eventsRepository.delete(id);
  }
}
