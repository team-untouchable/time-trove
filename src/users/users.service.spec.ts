import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import type { UpdateUserDto } from './dto';
import { User } from './entities';
import { UsersService } from './users.service';

const repositoryMockFactory = () => ({
  create: jest.fn(),
  insert: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let mockUsersRepository: MockRepository<User>;
  let userDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    mockUsersRepository = module.get(getRepositoryToken(User));

    userDto = {
      username: 'Test User',
      email: 'test@example.com',
      password: 'testpassword1',
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user record and return that', async () => {
      const user = new User();
      Object.assign(user, userDto);

      mockUsersRepository.create.mockReturnValue(user);
      mockUsersRepository.insert.mockResolvedValue(undefined);

      const result = await service.create(userDto);

      expect(mockUsersRepository.create).toHaveBeenCalledWith(userDto);
      expect(mockUsersRepository.insert).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should return user array', async () => {
      const user = new User();
      Object.assign(user, userDto);

      mockUsersRepository.find.mockReturnValue([user]);

      const result = await service.findAll();

      expect(mockUsersRepository.find).toHaveBeenCalled();
      expect(result).toEqual([user]);
    });
  });

  describe('findOne', () => {
    it('should return a user if a user with the given id exists', async () => {
      const userId = 'some-user-id';
      const expectedUser = new User();
      Object.assign(expectedUser, userDto);
      expectedUser.id = userId;

      mockUsersRepository.findOneBy.mockResolvedValue(expectedUser);

      const result = await service.findOneById(userId);

      expect(mockUsersRepository.findOneBy).toHaveBeenCalledWith({
        id: userId,
      });
      expect(result).toEqual(expectedUser);
    });

    it('should return null if no user with the given id exists', async () => {
      const userId = 'non-existing-user-id';
      mockUsersRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findOneById(userId);

      expect(mockUsersRepository.findOneBy).toHaveBeenCalledWith({
        id: userId,
      });
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a user and return the updated user data', async () => {
      const userId = 'some-user-id';
      const updateUserDto: UpdateUserDto = {
        username: 'Updated Name',
        password: 'UpdatedPassword',
      };
      const updatedUser = new User();
      Object.assign(updatedUser, updateUserDto, { id: userId });

      mockUsersRepository.update.mockResolvedValue({ affected: 1 });
      mockUsersRepository.findOneBy.mockResolvedValue(updatedUser);

      const result = await service.update(userId, updateUserDto);

      expect(mockUsersRepository.update).toHaveBeenCalledWith(
        userId,
        updateUserDto,
      );
      expect(mockUsersRepository.findOneBy).toHaveBeenCalledWith({
        id: userId,
      });
      expect(result).toEqual(updatedUser);
    });

    it('should return null if no user with the given id exists', async () => {
      const userId = 'non-existing-user-id';
      const updateUserDto: UpdateUserDto = {
        username: 'Updated Name',
        password: 'UpdatedPassword',
      };

      mockUsersRepository.update.mockResolvedValue({ affected: 0 });
      mockUsersRepository.findOneBy.mockResolvedValue(null);

      const result = await service.update(userId, updateUserDto);

      expect(mockUsersRepository.update).toHaveBeenCalledWith(
        userId,
        updateUserDto,
      );
      expect(mockUsersRepository.findOneBy).toHaveBeenCalledWith({
        id: userId,
      });
      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should delete a user and return void', async () => {
      const userId = 'some-user-id';

      mockUsersRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(userId);

      expect(mockUsersRepository.delete).toHaveBeenCalledWith(userId);
    });

    it('should handle the case where no user with the given id exists', async () => {
      const userId = 'non-existing-user-id';

      mockUsersRepository.delete.mockResolvedValue({ affected: 0 });

      await service.remove(userId);

      expect(mockUsersRepository.delete).toHaveBeenCalledWith(userId);
    });
  });
});
