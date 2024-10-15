import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { LoginModule } from './modules/login/login.module';
import { TaskUserModule } from './modules/tasks/taskUser.module';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [UserModule, LoginModule, TaskUserModule, NotificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
