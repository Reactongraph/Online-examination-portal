import { Injectable } from '@nestjs/common';
import { json } from 'stream/consumers';
import { option_dto } from './question_options.entity';
import { PrismaService } from 'src/prisma.service';
import { Participants, PrismaClient } from '@prisma/client';
@Injectable()
export class QuestionOptionsService {
  constructor(private prisma: PrismaService) {}
  async create(options_dto: option_dto, path: string) {
    // date comes in string and in db status column data type is boolean so we convert string to boolean
    const status = Boolean(options_dto?.status);
    try {
      const user = await this.prisma.questions_options.create({
        data: {
          option_type: options_dto.option_type,
          option: options_dto.option,
          question_id: options_dto.question_id,
          correct: options_dto?.correct,
          image: path,
          status,
        },
      });
      return 'inserted';
    } catch (err) {
      return { error: err };
    }
  }
  async findAll() {
    const users = await this.prisma.questions_options.findMany();

    return `${JSON.stringify(users)}`;
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.questions_options.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        return `user not found with this  ${id}`;
      }
      return user;
    } catch (err) {
      return { error: err };
    }
  }
  async update(id: string, updateRestApiDto: any) {
    try {
      const updateUser = await this.prisma.questions_options.update({
        where: {
          id,
        },
        data: updateRestApiDto,
      });
      if (!updateUser) {
        return `user not found for this ${id}`;
      }
      return 'updated ';
    } catch (err) {
      return { error: err };
    }
  }

  async remove(id: string) {
    try {
      const delete_user = await this.prisma.questions_options.delete({
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
