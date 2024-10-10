import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserService } from './createUser.service';
import { PrismaService } from 'src/infra/database/prisma.service';
import { IUserRepository } from './repositories/user.repository';
import { UserPrismaRepository } from './repositories/prisma/user.prisma.repository';
@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserService,
    PrismaService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}
