import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma.service';
import { SignInService } from './signIn.service';
import { LoginController } from './login.controller';
import { IUserRepository } from '../users/repositories/user.repository';
import { UserPrismaRepository } from '../users/repositories/prisma/user.prisma.repository';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [LoginController],
  providers: [
    PrismaService,
    SignInService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class LoginModule {}
