import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserService } from './services/createUser.service';
import { PrismaService } from 'src/infra/database/prisma.service';
import { IUserRepository } from './repositories/user.repository';
import { UserPrismaRepository } from './repositories/prisma/user.prisma.repository';
import { ProfileUserUseCase } from './services/profileUser.service';
@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserService,
    PrismaService,
    ProfileUserUseCase,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}
