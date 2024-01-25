import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import type { JwtAccessPayload } from '@src/auth';
import { UsersService } from '@src/users';
import type { CreateEventDto } from './dto/create-event.dto';
import type { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    private usersService: UsersService,
  ) {}

  async create(userid: string, createeventDto: CreateEventDto): Promise<Event> {
    const user = await this.usersService.findOneByEmail(userid);
    if (!user) {
      throw new Error('User not found');
    }
    const event = this.eventsRepository.create(createeventDto);
    event.user_id = user;
    return this.eventsRepository.save(event);
  }

  findAll(userid: string): Promise<Event[]> {
    return this.eventsRepository.find({
      where: {
        user_id: Equal(userid),
      },
    });
  }

  findOneById(id: string): Promise<Event | null> {
    return this.eventsRepository.findOneBy({ id });
  }

  findOneByUserId(userid: string): Promise<Event[] | null> {
    return this.eventsRepository.find({
      where: {
        user_id: Equal(userid),
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
