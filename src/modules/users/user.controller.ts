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
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/infra/providers/auth-guard-provider';
import { ProfileUserService } from './services/profileUser.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AvatarDto,
  createUserDataDto,
  FileDto,
} from './dto/createUserData.dto';
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
  @ApiBearerAuth()
  @ApiOkResponse()
  @UseGuards(AuthGuard)
  async profile(@Request() req): Promise<createUserDataDto | null> {
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
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadAvatar(@Request() req, @UploadedFile() file: FileDto) {
    const data: AvatarDto = {
      idUser: String(req.user.id),
      file: file,
    };
    return await this.uploadAvatarUserService.execute(data);
  }
}
