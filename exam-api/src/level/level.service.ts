import { Injectable } from '@nestjs/common'
import { level_dto } from './level.entity'
import { PrismaService } from 'src/prisma.service'
import {Login,Level, Prisma } from '@prisma/client'
@Injectable()
export class LevelService {
  constructor(private prisma: PrismaService) {}
  async create(params: level_dto) {
    console.log('in service ', params?.level)
    const status = params?.status
    const toLowerCaseLevel = params?.level.toLowerCase()
    const find = await this.prisma.level.findUnique({
      where: {
        level: toLowerCaseLevel
      }
    })
    console.log("find", find);
    if (find != null) {
      return 'level already exist'
    }
    else {

      const users = await this.prisma.level.create({
        data: {
          level:toLowerCaseLevel,
          status:status
        }
      }
      )
      return { message :'level inserted'}
    }
  }

  async findAll() {
    const users = await this.prisma.level.findMany()
    console.log(users)

    return `${JSON.stringify(users)}`
  }

  async findOne(id: string) {
    console.log(id)

    const user = await this.prisma.level.findUnique({
      where: {
        id
      }
    })
    console.log(user)
    if (!user) {
      return `data not found with this  ${id}`
    }

    return `${JSON.stringify(user)} `
  }

  async update(id: string, updateRestApiDto: level_dto) {
    const toLowerCaseLevel = updateRestApiDto?.level.toLowerCase()
    const find = await this.prisma.level.findUnique({
      where: {
        level: toLowerCaseLevel
      }
    })
    if (find != null) {
      return 'level already exist'
    }
    else {
    const updateUser = await this.prisma.level.update({
      where: {
        id
      },
      data: {
        level:toLowerCaseLevel
      } 
    })
    
    if (!updateUser) {
      return `user not found for this ${id}`
    }
    return `${id} `
  }
  }

  async remove(id: string) {
    const delete_user = await this.prisma.level.delete({
      where: {
        id
      }
    })
    return `This action removes a #${id} restApi`
  }
}
