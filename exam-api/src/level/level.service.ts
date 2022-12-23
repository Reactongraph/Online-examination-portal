import { Injectable } from '@nestjs/common';
import { level_dto } from './level.entity';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class LevelService {
  constructor(private readonly prisma: PrismaService) {}
  async create(params: level_dto) {
    const status = params?.status;
    const toLowerCaseLevel = params?.level.toLowerCase();
    const find = await this.prisma.level.findUnique({
      where: {
        level: toLowerCaseLevel,
      },
    });
    if (find != null) {
      return 'level already exist';
    } else {
      const users = await this.prisma.level.create({
        data: {
          level: toLowerCaseLevel,
          status,
        },
      });
      return { message: 'level inserted', data: users };
    }
  }

  async findAll() {
    const users = await this.prisma.level.findMany();

    return `${JSON.stringify(users)}`;
  }

  async findOne(id: string) {
    const user = await this.prisma.level.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return `data not found with this  ${id}`;
    }

    return `${JSON.stringify(user)} `;
  }

  async update(id: string, updateRestApiDto: level_dto) {
    const toLowerCaseLevel = updateRestApiDto?.level.toLowerCase();
    const find = await this.prisma.level.findUnique({
      where: {
        level: toLowerCaseLevel,
      },
    });
    if (find != null) {
      return 'level already exist';
    } else {
      const updateUser = await this.prisma.level.update({
        where: {
          id,
        },
        data: {
          level: toLowerCaseLevel,
        },
      });

      if (!updateUser) {
        return `user not found for this ${id}`;
      }
      return `${id} `;
    }
  }

  async remove(id: string) {
    const delete_user = await this.prisma.level.delete({
      where: {
        id,
      },
    });
    return delete_user;
  }
}
