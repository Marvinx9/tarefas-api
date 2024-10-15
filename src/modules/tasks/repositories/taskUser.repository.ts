import { TaskUserRequestDto } from '../dto/createTaskUser.dto';

export abstract class ITaskUserRepository {
  abstract save(data: TaskUserRequestDto): Promise<{ id: string }>;
  abstract findAllStartDay(): Promise<any>;
}
