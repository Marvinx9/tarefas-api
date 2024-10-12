import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { IUserRepository } from '../users/repositories/user.repository';
import { LoginOutputDto } from './dto/loginOutputDto';

@Injectable()
export class LoginService {
  constructor(
    private jwtService: JwtService,
    private userRepository: IUserRepository,
  ) {}

  async execute(data: LoginDto): Promise<LoginOutputDto> {
    const user = await this.userRepository.findByUsername(data.username);

    if (!user) {
      throw new UnauthorizedException('Usuário ou senha incorretos!');
    }

    const isEqualPassword = await compare(data.password, user.password);

    if (!isEqualPassword) {
      throw new UnauthorizedException('Usuário ou senha incorretos!');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      id: user.id,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      id: user.id,
      username: user.username,
    };
  }
}
