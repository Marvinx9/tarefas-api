import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import {
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginOutputDto } from './dto/loginOutputDto';

@Controller('login')
@ApiResponse({ type: LoginOutputDto })
@ApiOkResponse()
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  @ApiUnauthorizedResponse({ description: 'Usuário ou senha incorretos!' })
  async loginUser(@Body() data: LoginDto) {
    return await this.loginService.execute(data);
  }
}
