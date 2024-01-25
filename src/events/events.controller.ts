import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/guards';
import { CustomApiResponse } from '@src/common/decorators/custom-api-response.decorator';
import { RequestWithPayload } from '@src/auth';
import { CreateEventDto } from './dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities';
import { EventsService } from './events.service';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private eventService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiExtraModels(Event)
  @CustomApiResponse(Event, ApiCreatedResponse)
  create(
    @Req() req: RequestWithPayload,
    @Body() createEventDto: CreateEventDto,
  ) {
    console.log(req.user);
    console.log(createEventDto);
    return this.eventService.create(req.user.email, createEventDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiExtraModels(Event)
  @CustomApiResponse([Event])
  findAll(@Req() req: RequestWithPayload) {
    return this.eventService.findAll(req.user.uid);
  }

  /*
  @Get(':userid')
  @UseGuards(JwtAuthGuard)
  @ApiExtraModels(Event)
  @CustomApiResponse([Event])
  findAllByUserId(@Param('userid') userid: string) {
    return this.eventService.findOneByUserId(userid);
  }
*/
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiExtraModels(Event)
  @CustomApiResponse(Event)
  findById(@Param('id') id: string) {
    return this.eventService.findOneById(id);
  }

  /*
  @Get('/:id/:title')
  @UseGuards(JwtAuthGuard)
  @ApiExtraModels(Event)
  @CustomApiResponse(Event)
  findByTitle(@Param('id') userid: string, @Param('title') title: string) {
    return this.eventService.findOneByTitle(userid, title);
  }

  @Get('/:id/:startedat')
  @UseGuards(JwtAuthGuard)
  @ApiExtraModels(Event)
  @CustomApiResponse(Event)
  findByStartedAt(
    @Param('id') userid: string,
    @Param('startedat') startedat: Date,
  ) {
    return this.eventService.findOneByStartedAt(userid, startedat);
  }
*/
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiExtraModels(Event)
  @CustomApiResponse(Event)
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }
}
