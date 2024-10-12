import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserInputDto } from '../dto/createUserInput.dto';
import { IUserRepository } from '../repositories/user.repository';

@Injectable()
export class CreateUserService {
  constructor(private userReposytory: IUserRepository) {}

  async execute(data: CreateUserInputDto) {
    const user = await this.userReposytory.findByUsernameOrEmail(
      data.username,
      data.email,
    );

    if (user) {
      throw new BadRequestException('User already exists!');
    }

    const password = await hash(data.password, 10);

    return await this.userReposytory.save({
      ...data,
      password,
    });
  }
}
