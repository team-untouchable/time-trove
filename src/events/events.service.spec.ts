import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { EventsService } from './events.service';

describe('EventService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsService],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
