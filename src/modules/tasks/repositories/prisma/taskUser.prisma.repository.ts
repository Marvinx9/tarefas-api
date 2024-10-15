import { PrismaService } from 'src/infra/database/prisma.service';
import {
  TaskUserNotificationDto,
  TaskUserRequestDto,
} from '../../dto/createTaskUser.dto';
import { ITaskUserRepository } from '../taskUser.repository';
import { Injectable } from '@nestjs/common';
import { endOfDay, startOfDay } from 'src/infra/utils/date';

@Injectable()
export class TaskUserPrismaRepository implements ITaskUserRepository {
  constructor(private prismaService: PrismaService) {}

  async findAllStartDay(): Promise<TaskUserNotificationDto[] | null> {
    const allTasks = await this.prismaService.taskUser.findMany({
      where: {
        and: [
          {
            task: {
              startAt: {
                gte: startOfDay(),
                lte: endOfDay(),
              },
            },
          },
        ],
      },
      include: {
        task: {
          select: {
            startAt: true,
            endAt: true,
            title: true,
            description: true,
          },
        },
        user: true,
      },
    });
    return allTasks;
  }

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
