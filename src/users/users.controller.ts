import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@src/auth/guards';
import { CustomApiResponse } from '@src/common/decorators';
import { UpdateUserDto } from './dto';
import { User } from './entities';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

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
    return this.usersService.findOneById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiExtraModels(User)
  @CustomApiResponse(User)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
