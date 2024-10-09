import { Controller, Get } from '@nestjs/common';

@Controller()
export class UserController {
  @Get('/hello')
  async helloUser() {
    return 'Opaaaa';
  }
}
