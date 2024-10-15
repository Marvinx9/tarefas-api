import { Type } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class TaskUserRequestDto {
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

type TaskDto = {
  startAt: Date;
  endAt: Date;
  title: string;
  description: string;
};

type UserDto = {
  id: string;
  username: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  createdAt: Date;
};

export type TaskUserNotificationDto = {
  id: string;
  taskId: string;
  userId: string;
  createdAt: Date;
  task: TaskDto;
  user: UserDto;
};
