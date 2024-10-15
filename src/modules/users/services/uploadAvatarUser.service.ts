import { Injectable } from '@nestjs/common';
import { AvatarDto } from '../dto/createUserData.dto';
import { IStorage } from 'src/infra/providers/storage/storage';
import { IUserRepository } from '../repositories/user.repository';
import { extname } from 'path';

@Injectable()
export class UploadAvatarUserService {
  constructor(
    private storage: IStorage,
    private userRepository: IUserRepository,
  ) {}
  async execute(data: AvatarDto) {
    const extFile = extname(data.file.originalname);

    const transformName = `${data.idUser}${extFile}`;

    data.file.originalname = transformName;

    const file = await this.storage.upload(data.file, 'avatar');

    const pathAvatarUser = `avatar/${data.file.originalname}`;
    await this.userRepository.uploadAvatar(data.idUser, pathAvatarUser);
    return file;
  }
}
