import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateUserInputDto } from './dto/createUserInput.dto';

@Injectable()
export class CreateUserService {
  constructor(private prismaService: PrismaService) {}

  async execute(data: CreateUserInputDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });

    if (user) {
      throw new BadRequestException('User already exists!');
    }
    return await this.prismaService.user.create({
      data,
    });
  }
}
