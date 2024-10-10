import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn.dto';
import { UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserPrismaRepository } from '../users/repositories/prisma/user.prisma.repository';

export class SignInService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserPrismaRepository,
  ) {}

  async execute(data: SignInDto) {
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
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
