import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ITaskUserRepository } from 'src/modules/tasks/repositories/taskUser.repository';

type MessageDto = {
  email: string;
  startAt: Date;
  endAt: Date;
  name: string;
  title: string;
  description: string;
};

@Injectable()
export class NotificationTaskUserSchedule {
  constructor(
    private taskUserRepository: ITaskUserRepository,
    @Inject('NOTIFICATION') private readonly notificationClient: ClientKafka,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async getAllTasksDay() {
    const allTasks = await this.taskUserRepository.findAllStartDay();

    if (allTasks) {
      allTasks.forEach((task) => {
        const message: MessageDto = {
          email: task.user.email,
          startAt: task.task.startAt,
          endAt: task.task.endAt,
          name: task.user.username,
          title: task.task.title,
          description: task.task.description,
        };
        this.notificationClient.emit('tp_task_notification', message);
      });
    }
  }
}
