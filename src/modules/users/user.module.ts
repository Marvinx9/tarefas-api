import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserService } from './services/createUser.service';
import { PrismaService } from 'src/infra/database/prisma.service';
import { IUserRepository } from './repositories/user.repository';
import { UserPrismaRepository } from './repositories/prisma/user.prisma.repository';
import { ProfileUserService } from './services/profileUser.service';
import { UploadAvatarUserService } from './services/uploadAvatarUser.service';
import { IStorage } from 'src/infra/providers/storage/storage';
import { SupabaseStorage } from 'src/infra/providers/storage/supabase.storage';
@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserService,
    PrismaService,
    ProfileUserService,
    UploadAvatarUserService,
    {
      provide: IUserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: IStorage,
      useClass: SupabaseStorage,
    },
  ],
})
export class UserModule {}
