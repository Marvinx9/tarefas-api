import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateUserService } from './services/createUser.service';
import { CreateUserInputDto } from './dto/createUserInput.dto';
import { CreateUserValidationPipe } from './pipe/createUserValidation.pipe';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/infra/providers/auth-guard-provider';
import { ProfileUserUseCase } from './services/profileUser.service';

@Controller('/users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly profileUserUseCase: ProfileUserUseCase,
  ) {}

  @Post()
  @ApiCreatedResponse()
  @ApiBadRequestResponse({ description: 'User already exists!' })
  @UsePipes(new CreateUserValidationPipe())
  async create(@Body() data: CreateUserInputDto) {
    return await this.createUserService.execute(data);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req) {
    const id = String(req.user.id);
    return await this.profileUserUseCase.execute(id);
  }
}
