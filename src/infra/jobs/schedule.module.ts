import { Module } from '@nestjs/common';
import { NotificationTaskUserSchedule } from './notificationTaskUser.schedule';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [NotificationTaskUserSchedule],
})
export class ScheduleTaskModule {}
