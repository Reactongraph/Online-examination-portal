import { Injectable } from '@nestjs/common';
<<<<<<< HEAD
import { module_dto } from './module.entity';
import { PrismaService } from 'src/prisma.service';
import { Login, Level, Prisma } from '@prisma/client';
@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) {}
  async create(params: module_dto) {
    try {
      const module = params?.module;
      const status = params?.status;
      const toLowerCaseModule = params?.module.toLowerCase();
      const find = await this.prisma.module.findUnique({
        where: {
          module: toLowerCaseModule,
        },
      });
      if (find != null) {
        return 'module already exist';
      } else {
        const users = await this.prisma.module.create({
          data: {
            module: toLowerCaseModule,
            status,
          },
        });
        return { message: 'module inserted' };
      }
    } catch (error) {
      return { error: error };
    }
=======
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
import { module_dto } from './module.entity';
@Injectable()
export class ModuleService {
  async create(params: module_dto) {
    prisma.$connect();
    console.log('in service ', params?.module);
    const module = params?.module;
    const status = params?.status;
    const toLowerCaseModule = params?.module.toLowerCase();
    const users = await prisma.module.create({
      data: {
        module: toLowerCaseModule,
        status: status,
      },
    });
    return 'module inserted';
>>>>>>> 22520a1ea38797de82193de6715e70f10ad21484
  }
  async findAll() {
    prisma.$connect();
    const users = await prisma.Module.findMany();
    console.log(users);

<<<<<<< HEAD
  async findAll() {
    const users = await this.prisma.module.findMany();

=======
>>>>>>> 22520a1ea38797de82193de6715e70f10ad21484
    return `${JSON.stringify(users)}`;
  }
  async findOne(id: string) {
    console.log(id);

<<<<<<< HEAD
  async findOne(id: string) {
    try {
      const user = await this.prisma.module.findUnique({
        where: {
          id,
        },
      });
      if (user) {
        return user;
      } else {
        return `data not found with this  ${id}`;
      }
    } catch (error) {
      return { error: error };
    }
  }

  async update(id: string, updateRestApiDto: module_dto) {
    try {
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
        return `module updated `;
      }
    } catch (err) {
      return { error: err };
    }
  }

  async remove(id: string) {
    try {
      const delete_user = await this.prisma.module.delete({
        where: {
          id,
        },
      });
      return `This action removes a #${id} restApi`;
    } catch (error) {
      return { error: error };
    }
=======
    const user = await prisma.Module.findUnique({
      where: {
        id: id,
      },
    });
    console.log(user);
    if (!user) {
      return `data not found with this  ${id}`;
    }

    return `${JSON.stringify(user)} `;
  }
  async update(id: string, updateRestApiDto: module_dto) {
    const check_id = await prisma.Module.findUnique({
      where: {
        id: id,
      },
    });
    console.log('checkid', check_id.module);
    if (updateRestApiDto?.module == check_id.module) {
      return { message: 'module already exist' };
    }

    if (check_id == null) {
      return 'invalid id ';
    } else {
      const updateUser = await prisma.Module.update({
        where: {
          id: id,
        },
        data: updateRestApiDto,
      });
      if (!updateUser) {
        return `user not found for this ${id}`;
      }
      return `${id} `;
    }
  }


  async remove(id: string) {
    const delete_user = await prisma.Module.delete({
      where: {
        id: id,
      },
    });
    return `This action removes a #${id} restApi`;
>>>>>>> 22520a1ea38797de82193de6715e70f10ad21484
  }
}
