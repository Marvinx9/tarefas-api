import { Module } from '@nestjs/common';
import { NotificationTaskUserSchedule } from './notificationTaskUser.schedule';
import { ScheduleModule } from '@nestjs/schedule';
import { ITaskUserRepository } from 'src/modules/tasks/repositories/taskUser.repository';
import { TaskUserPrismaRepository } from 'src/modules/tasks/repositories/prisma/taskUser.prisma.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: 'NOTIFICATION',
        transport: Transport.TCP,
        options: { port: 3002, host: '127.0.0.1' },
      },
    ]),
  ],
  providers: [
    NotificationTaskUserSchedule,
    {
      provide: ITaskUserRepository,
      useClass: TaskUserPrismaRepository,
    },
  ],
})
export class ScheduleTaskModule {}
