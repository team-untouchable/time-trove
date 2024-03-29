import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthConfigService } from '@src/config';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import type { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private authConfigService: AuthConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await this.encryptPassword(createUserDto.password);
    const user: User = this.usersRepository.create(createUserDto);
    await this.usersRepository.insert(user);
    return user;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneById(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    updateUserDto.password = await this.encryptPassword(updateUserDto.password);
    await this.usersRepository.update(id, updateUserDto);
    return this.findOneById(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  private encryptPassword(password: string) {
    return bcrypt.hash(password, this.authConfigService.bcrypt_salt_rounds);
  }
}
