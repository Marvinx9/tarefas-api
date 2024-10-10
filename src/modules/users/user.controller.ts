import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from './createUser.service';
import { CreateUserInputDto } from './dto/createUserInput.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly createUserService: CreateUserService) {}
  @Post()
  async create(@Body() data: CreateUserInputDto) {
    return await this.createUserService.execute(data);
  }
}
