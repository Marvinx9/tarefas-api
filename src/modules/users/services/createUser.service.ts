import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserInputDto } from '../dto/createUserInput.dto';
import { IUserRepository } from '../repositories/user.repository';

@Injectable()
export class CreateUserService {
  private readonly logger = new Logger(CreateUserService.name);
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserInputDto) {
    const user = await this.userRepository.findByUsernameOrEmail(
      data.username,
      data.email,
    );

    if (user) {
      this.logger.error(`User ${data.username} already exists... `, data);
      throw new BadRequestException('User already exists!');
    }

    const password = await hash(data.password, 10);

    return await this.userRepository.save({
      ...data,
      password,
    });
  }
}
