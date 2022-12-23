import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { module_dto } from './module.entity';
@Injectable()
export class ModuleService {
  constructor(private readonly prisma: PrismaService) {}
  async create(params: module_dto) {
    const status = params?.status;
    const toLowerCaseModule = params?.module.toLowerCase();
    await this.prisma.module.create({
      data: {
        module: toLowerCaseModule,
        status,
      },
    });
    return 'module inserted';
  }

  async findAll() {
    const users = await this.prisma.module.findMany();

    return `${JSON.stringify(users)}`;
  }

  async findOne(id: string) {
    const user = await this.prisma.module.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return `data not found with this  ${id}`;
    }

    return `${JSON.stringify(user)} `;
  }

  async update(id: string, updateRestApiDto: module_dto) {
    const CHECK_ID = await this.prisma.module.findUnique({
      where: {
        id,
      },
    });
    if (updateRestApiDto?.module === CHECK_ID.module) {
      return { message: 'module already exist' };
    }

    if (CHECK_ID == null) {
      return 'invalid id ';
    } else {
      const UPDATE_USER = await this.prisma.module.update({
        where: {
          id,
        },
        data: updateRestApiDto,
      });
      if (!UPDATE_USER) {
        return `user not found for this ${id}`;
      }
      return `module updated ${id} `;
    }
  }

  async remove(id: string) {
    const DELETE_USER = await this.prisma.module.delete({
      where: {
        id,
      },
    });
    return DELETE_USER;
  }
}
