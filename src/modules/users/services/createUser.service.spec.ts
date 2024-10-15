import { Test } from '@nestjs/testing';
import { CreateUserService } from './createUser.service';
import { CreateUserInputDto } from '../dto/createUserInput.dto';
import { IUserRepository } from '../repositories/user.repository';
import { BadRequestException } from '@nestjs/common';

describe('CreateUserService', () => {
  let sut: CreateUserService;
  let iUserRepository: IUserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: IUserRepository,
          useValue: {
            findByUsernameOrEmail: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    sut = moduleRef.get<CreateUserService>(CreateUserService);
    iUserRepository = moduleRef.get<IUserRepository>(IUserRepository);
  });

  it('Should be defined', () => {
    expect(sut).toBeDefined();
    expect(iUserRepository).toBeDefined();
  });

  it('Shoud be able to create a new user', async () => {
    // Arrange
    const data: CreateUserInputDto = {
      email: 'email@test.com',
      name: 'name test',
      password: '1234',
      username: 'username_test',
    };

    const response = await sut.execute(data);

    // Assert
    expect(response).toBeUndefined();
  });

  it('Shoud throw BadRequestException if user already exists', async () => {
    // Arrange
    const data: CreateUserInputDto = {
      email: 'email@test.com',
      name: 'name test',
      password: '1234',
      username: 'username_test',
    };

    jest.spyOn(iUserRepository, 'findByUsernameOrEmail').mockResolvedValueOnce({
      ...data,
      id: '233',
      createdAt: new Date('2024-10-14'),
    });

    // Assert
    await expect(sut.execute(data)).rejects.toStrictEqual(
      new BadRequestException('User already exists!'),
    );
  });
});
