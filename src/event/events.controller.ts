import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { CustomApiResponse } from '@src/common/decorators/custom-api-response.decorator';
import { get } from 'http';
import { UpdateUserDto } from '@src/users';
import { AuthGuard } from '@nestjs/passport';
import { EventService } from './events.service';
import { CreateEventDto } from './dto';
import { UpdateEventDto } from './dto/update-event.dto';

@ApiTags('events')
@Controller('events')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiExtraModels(Event)
  @CustomApiResponse(Event)
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiExtraModels(Event)
  // eslint-disable-next-line no-undef
  @CustomApiResponse([Event])
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':userid')
  @UseGuards(AuthGuard)
  @ApiExtraModels(Event)
  @CustomApiResponse([Event])
  findAllByUserId(@Param('userid') userid: string) {
    return this.eventService.findOneByUserId(userid);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiExtraModels(Event)
  @CustomApiResponse(Event)
  findById(@Param('id') id: string) {
    return this.eventService.findOneById(id);
  }

  @Get('/:id/:title')
  @UseGuards(AuthGuard)
  @ApiExtraModels(Event)
  @CustomApiResponse(Event)
  findByTitle(@Param('id') userid: string, @Param('title') title: string) {
    return this.eventService.findOneByTitle(userid, title);
  }

  @Get('/:id/:startedat')
  @UseGuards(AuthGuard)
  @ApiExtraModels(Event)
  @CustomApiResponse(Event)
  findByStartedAt(
    @Param('id') userid: string,
    @Param('startedat') startedat: Date,
  ) {
    return this.eventService.findOneByStartedAt(userid, startedat);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiExtraModels(Event)
  @CustomApiResponse(Event)
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }
}
