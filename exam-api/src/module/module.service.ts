import { Injectable } from '@nestjs/common'
import { module_dto } from './module.entity'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
@Injectable()
export class ModuleService {
  async create (params: module_dto) {
    prisma.$connect()
    console.log('in service ', params?.module)
    const module = params?.module
    const status = params?.status
    const toLowerCaseModule = params?.module.toLowerCase()
    const users = await prisma.module.create({
      data: {
        module: toLowerCaseModule,
        status
      }
    }
    )
    return 'module inserted'
  }

  async findAll () {
    prisma.$connect()
    const users = await prisma.Module.findMany()
    console.log(users)

    return `${JSON.stringify(users)}`
  }

  async findOne (id: string) {
    console.log(id)

    const user = await prisma.Module.findUnique({
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
    const check_id = await prisma.Module.findUnique({
      where: {
        id
      }
    })
    console.log('checkid', check_id)
    const data_check = await prisma.Module.findUnique({
      where: {
        module: updateRestApiDto.module

      }
    })
    console.log('data check', data_check)

    if (check_id == null || data_check != null) {
      return 'invalid id or data already exist!'
    } else {
      console.log('inside else', updateRestApiDto.module.toLowerCase)

      const updateUser = await prisma.Module.update({
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
    const delete_user = await prisma.Module.delete({
      where: {
        id
      }
    })
    return `This action removes a #${id} restApi`
  }
}
