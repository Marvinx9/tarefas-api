import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';

@Injectable()
export class ProfileUserService {
  constructor(private userRepository: IUserRepository) {}
  async execute(id: string) {
    const result = await this.userRepository.findById(id);

    delete result.password;

    return result;
  }
}
