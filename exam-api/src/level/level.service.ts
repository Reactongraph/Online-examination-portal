import { Injectable, Res, HttpStatus } from '@nestjs/common';
import { level_dto } from './level.entity';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class LevelService {
  constructor(private prisma: PrismaService) {}
  async create(params: level_dto) {
    const status = params?.status;
    const toLowerCaseLevel = params?.level.toLowerCase();
    try {
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
            status: status,
          },
        });
        return { message: 'level inserted' };
      }
    } catch (error) {
      return { error: error };
    }
  }

  async findAll() {
    const users = await this.prisma.level.findMany();

    return `${JSON.stringify(users)}`;
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.level.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        return `data not found with this  ${id}`;
      }

      return `${JSON.stringify(user)} `;
    } catch (err) {
      return { error: err };
    }
  }

  async update(id: string, updateRestApiDto: level_dto) {
    try {
      const check_id = await await this.prisma.level.findUnique({
        where: {
          id: id,
        },
      });
      if (updateRestApiDto?.level == check_id.level) {
        return { message: 'level already exist' };
      }

      if (check_id == null) {
        return 'invalid id ';
      } else {
        const updateUser = await this.prisma.level.update({
          where: {
            id: id,
          },
          data: updateRestApiDto,
        });
        if (!updateUser) {
          return `user not found for this ${id}`;
        }
        return `updated `;
      }
    } catch (error) {
      return { error: error };
    }
  }

  async remove(id: string) {
    try {
      const delete_user = await this.prisma.level.delete({
        where: {
          id,
        },
      });
      return `This action removes a #${id} restApi`;
    } catch (err) {
      return { error: err };
    }
  }
}
