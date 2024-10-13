import { Type } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class TaskUserRequestDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  startAt: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  endAt: Date;

  @ApiProperty()
  @IsIn(['BAIXA', 'MEDIA', 'ALTA'])
  @IsNotEmpty()
  priority: string;

  @ApiProperty()
  @IsIn(['PENDENTE', 'ANDAMENTO', 'CONCLUIDO'])
  @IsNotEmpty()
  status: string;
}
