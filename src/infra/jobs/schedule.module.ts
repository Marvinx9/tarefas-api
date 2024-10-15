import { Module } from '@nestjs/common';
import { NotificationTaskUserSchedule } from './notificationTaskUser.schedule';
import { ScheduleModule } from '@nestjs/schedule';
import { ITaskUserRepository } from 'src/modules/tasks/repositories/taskUser.repository';
import { TaskUserPrismaRepository } from 'src/modules/tasks/repositories/prisma/taskUser.prisma.repository';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    NotificationTaskUserSchedule,
    {
      provide: ITaskUserRepository,
      useClass: TaskUserPrismaRepository,
    },
  ],
})
export class ScheduleTaskModule {}
