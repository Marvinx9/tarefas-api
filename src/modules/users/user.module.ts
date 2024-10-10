import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserService } from './createUser.service';
import { PrismaService } from 'src/infra/database/prisma.service';
@Module({
  imports: [],
  controllers: [UserController],
  providers: [CreateUserService, PrismaService],
})
export class UserModule {}
