import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { CustomApiResponse } from '@src/common/decorators';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @ApiExtraModels(User)
  @CustomApiResponse(User, ApiCreatedResponse)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiExtraModels(User)
  @CustomApiResponse([User])
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiExtraModels(User)
  @CustomApiResponse(User)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiExtraModels(User)
  @CustomApiResponse(User)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.usersService.remove(id);
  }
}
