import { Injectable } from '@nestjs/common'
import { module_dto } from './module.entity'
import { PrismaService } from 'src/prisma.service'
import {Login,Level, Prisma } from '@prisma/client'
@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) {}
  async create (params: module_dto) {

    console.log('in service ', params?.module)
    const module = params?.module
    const status = params?.status
    const toLowerCaseModule = params?.module.toLowerCase()
    const users = await this.prisma.module.create({
      data: {
        module: toLowerCaseModule,
        status
      }
    }
    )
    return 'module inserted'
  }

  async findAll () {

    const users = await this.prisma.module.findMany()
    console.log(users)

    return `${JSON.stringify(users)}`
  }

  async findOne (id: string) {
    console.log(id)

    const user = await this.prisma.module.findUnique({
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

  async update (id: string, updateRestApiDto: module_dto) {
    const check_id = await this.prisma.module.findUnique({
      where: {
        id
      }
    })
    console.log('checkid', check_id)
    const data_check = await this.prisma.module.findUnique({
      where: {
        module: updateRestApiDto.module

      }
    })
    console.log('data check', data_check)

    if (check_id == null || data_check != null) {
      return 'invalid id or data already exist!'
    } else {
      console.log('inside else', updateRestApiDto.module.toLowerCase)

      const updateUser = await this.prisma.module.update({
        where: {
          id
        },
        data: updateRestApiDto
      })
      if (!updateUser) {
        return `user not found for this ${id}`
      }
      return `${id} `
    }
  }

  async remove (id: string) {
    const delete_user = await this.prisma.module.delete({
      where: {
        id
      }
    })
    return `This action removes a #${id} restApi`
  }
}
