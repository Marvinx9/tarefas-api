import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { LoginModule } from './modules/login/login.module';
import { TaskUserModule } from './modules/tasks/taskUser.module';
import { ScheduleTaskModule } from './infra/jobs/schedule.module';
import { PrismaModule } from './infra/database/prisma.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    LoginModule,
    TaskUserModule,
    ScheduleTaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
