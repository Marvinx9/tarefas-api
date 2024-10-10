import { Body, Controller, Post } from '@nestjs/common';
import { SignInService } from './signIn.service';
import { SignInDto } from './dto/signIn.dto';

@Controller()
export class LoginController {
  constructor(private signInService: SignInService) {}
  @Post()
  async loginUser(@Body() data: SignInDto) {
    await this.signInService.execute(data);
  }
}
