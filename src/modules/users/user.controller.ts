import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CreateUserService } from './createUser.service';
import { CreateUserInputDto } from './dto/createUserInput.dto';
import { CreateUserValidationPipe } from './pipe/createUserValidation.pipe';

@Controller('/users')
export class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @UsePipes(new CreateUserValidationPipe())
  async create(@Body() data: CreateUserInputDto) {
    return await this.createUserService.execute(data);
  }
}
