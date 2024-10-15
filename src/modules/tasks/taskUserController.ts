import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateTaskUserService } from './services/createTaskUser.service';
import { AuthGuard } from 'src/infra/providers/auth-guard-provider';
import { TaskUserRequestDto } from './dto/createTaskUser.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('/tasks')
@ApiTags('Tasks')
export class TaskUserController {
  constructor(private createTaskUserService: CreateTaskUserService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async create(@Body() data: TaskUserRequestDto, @Request() req) {
    data.userId = String(req.user.id);
    return await this.createTaskUserService.execute(data);
  }
}
