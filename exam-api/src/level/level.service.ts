import { Injectable } from '@nestjs/common'
import { level_dto } from './level.entity'
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
@Injectable()
export class LevelService {
  async create (params: level_dto) {
    prisma.$connect()
    console.log('in service ', params?.level)
    const level = params?.level
    const status = params?.status
    const users = await prisma.Level.create({
      data: {
        level,
        status
      }
    }
    )
    return 'level inserted'
  }

  async findAll () {
    prisma.$connect()
    const users = await prisma.Level.findMany()
    console.log(users)

    return `${JSON.stringify(users)}`
  }

  async findOne (id: string) {
    console.log(id)

    const user = await prisma.Level.findUnique({
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

  async update (id: string, updateRestApiDto: level_dto) {
    const updateUser = await prisma.Level.update({
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

  async remove (id: string) {
    const delete_user = await prisma.Level.delete({
      where: {
        id
      }
    })
    return `This action removes a #${id} restApi`
  }
}
