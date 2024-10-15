import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';
import { createUserDataDto } from '../dto/createUserData.dto';

@Injectable()
export class ProfileUserService {
  constructor(private userRepository: IUserRepository) {}
  async execute(id: string): Promise<createUserDataDto | null> {
    const result = await this.userRepository.findById(id);

    delete result.password;

    return result;
  }
}
