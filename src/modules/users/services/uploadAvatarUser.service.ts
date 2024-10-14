import { Injectable } from '@nestjs/common';
import { AvatarDto } from '../dto/createUserData.dto';
import { IStorage } from 'src/infra/providers/storage/storage';
import { IUserRepository } from '../repositories/user.repository';

@Injectable()
export class UploadAvatarUserService {
  constructor(
    private storage: IStorage,
    private userRepository: IUserRepository,
  ) {}
  async execute(data: AvatarDto) {
    const file = await this.storage.upload(data.file, 'avatar');
    console.log(file);
    return file;
  }
}
