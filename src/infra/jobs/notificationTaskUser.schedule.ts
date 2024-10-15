import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TaskUserPrismaRepository } from 'src/modules/tasks/repositories/prisma/taskUser.prisma.repository';
import { ITaskUserRepository } from 'src/modules/tasks/repositories/taskUser.repository';

@Injectable()
export class NotificationTaskUserSchedule {
  constructor(private taskUserRepository: ITaskUserRepository) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async getAllTasksDay() {
    return await this.taskUserRepository.findAllStartDay();
  }
}
