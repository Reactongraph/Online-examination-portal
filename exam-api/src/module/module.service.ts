import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { module_dto } from './module.entity';
@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) {}
  async create(params: module_dto) {
    const status = params?.status;
    const toLowerCaseModule = params?.module.toLowerCase();
    await this.prisma.module.create({
      data: {
        module: toLowerCaseModule,
        status: status,
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
        id: id,
      },
    });
    if (!user) {
      return `data not found with this  ${id}`;
    }

    return `${JSON.stringify(user)} `;
  }
  async update(id: string, updateRestApiDto: module_dto) {
    const check_id = await this.prisma.module.findUnique({
      where: {
        id: id,
      },
    });
    if (updateRestApiDto?.module == check_id.module) {
      return { message: 'module already exist' };
    }

    if (check_id == null) {
      return 'invalid id ';
    } else {
      const updateUser = await this.prisma.module.update({
        where: {
          id: id,
        },
        data: updateRestApiDto,
      });
      if (!updateUser) {
        return `user not found for this ${id}`;
      }
      return `module updated ${id} `;
    }
  }

  async remove(id: string) {
    const delete_user = await this.prisma.module.delete({
      where: {
        id: id,
      },
    });
    return `module deleted  ${delete_user} `;
  }
}
