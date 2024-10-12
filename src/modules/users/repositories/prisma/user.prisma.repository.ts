import { PrismaService } from 'src/infra/database/prisma.service';
import { createUserDataDto } from '../../dto/createUserData.dto';
import { CreateUserInputDto } from '../../dto/createUserInput.dto';
import { IUserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPrismaRepository implements IUserRepository {
  constructor(private prismaService: PrismaService) {}
  async findById(id: string): Promise<createUserDataDto | null> {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByUsername(username: string): Promise<createUserDataDto | null> {
    return await this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
  }

  async findByUsernameOrEmail(
    username: string,
    email: string,
  ): Promise<createUserDataDto | null> {
    return await this.prismaService.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
  }

  async save(data: CreateUserInputDto): Promise<createUserDataDto> {
    return await this.prismaService.user.create({
      data,
    });
  }
}
