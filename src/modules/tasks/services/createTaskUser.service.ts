import { Injectable, Logger } from '@nestjs/common';
import { TaskUserRequestDto } from '../dto/createTaskUser.dto';
import { ITaskUserRepository } from '../repositories/taskUser.repository';

@Injectable()
export class CreateTaskUserService {
  private readonly logger = new Logger(CreateTaskUserService.name);
  constructor(private taskUserRepository: ITaskUserRepository) {}
  async execute(data: TaskUserRequestDto) {
    return await this.taskUserRepository.save(data);
  }
}
