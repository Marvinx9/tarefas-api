import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'nome do usuário', example: 'usuario.exemplo' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'senha do usuário', example: 'senha.exemplo' })
  @IsString()
  @IsNotEmpty()
  @Min(4)
  password: string;
}
