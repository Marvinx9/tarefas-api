import { PrismaService } from 'src/infra/database/prisma.service';
import { TaskUserRequestDto } from '../../dto/createTaskUser.dto';
import { ITaskUserRepository } from '../taskUser.repository';

export class TaskUserPrismaRepository implements ITaskUserRepository {
  constructor(private prismaService: PrismaService) {}
  async save(data: TaskUserRequestDto): Promise<{ id: string }> {
    return this.prismaService.taskUser.create({
      data: {
        task: {
          create: {
            description: data.description,
            endAt: data.endAt,
            startAt: data.startAt,
            title: data.title,
            priority: data.priority,
            status: data.status,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });
  }
}
