import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { CreateUserService } from './services/createUser.service';
import { CreateUserInputDto } from './dto/createUserInput.dto';
import { CreateUserValidationPipe } from './pipe/createUserValidation.pipe';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/infra/providers/auth-guard-provider';
import { ProfileUserService } from './services/profileUser.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AvatarDto, FileDto } from './dto/createUserData.dto';
import { UploadAvatarUserService } from './services/uploadAvatarUser.service';

@Controller('/users')
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly profileUserService: ProfileUserService,
    private readonly uploadAvatarUserService: UploadAvatarUserService,
  ) {}

  @Get('/profile')
  @UseGuards(AuthGuard)
  async profile(@Request() req) {
    const id = String(req.user.id);
    return await this.profileUserService.execute(id);
  }

  @Post()
  @ApiCreatedResponse()
  @ApiBadRequestResponse({ description: 'User already exists!' })
  @UsePipes(new CreateUserValidationPipe())
  async create(@Body() data: CreateUserInputDto) {
    return await this.createUserService.execute(data);
  }

  @Put('/avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@Request() req, @UploadedFile() file: FileDto) {
    const data: AvatarDto = {
      idUser: String(req.user.id),
      file: file,
    };
    return await this.uploadAvatarUserService.execute(data);
  }
}
