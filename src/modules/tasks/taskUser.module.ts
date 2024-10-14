import { Module } from '@nestjs/common';
import { TaskUserController } from './taskUserController';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateTaskUserService } from './services/createTaskUser.service';
import { ITaskUserRepository } from './repositories/taskUser.repository';
import { TaskUserPrismaRepository } from './repositories/prisma/taskUser.prisma.repository';

@Module({
  controllers: [TaskUserController],
  providers: [
    PrismaService,
    CreateTaskUserService,
    {
      provide: ITaskUserRepository,
      useClass: TaskUserPrismaRepository,
    },
  ],
})
export class TaskUserModule {}
