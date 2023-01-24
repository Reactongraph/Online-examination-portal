import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { module_dto } from './module.entity'
@Injectable()
export class ModuleService {
  constructor (private readonly prisma: PrismaService) {}
  async create (params: module_dto) {
    try {
      const toLowerCaseModule = params?.module.toLowerCase()

      const find = await this.prisma.module.findUnique({
        where: {
          module: toLowerCaseModule
        }
      })

      if (find != null) {
        return null
      }
      const status = params?.status
      await this.prisma.module.create({
        data: {
          module: toLowerCaseModule,
          status
        }
      })
      return 'module inserted'
    } catch (err) {
      return { error: err }
    }
  }

  async findAll () {
    try {
      const users = await this.prisma.module.findMany()

      return `${JSON.stringify(users)}`
    } catch (err) {
      return { error: err }
    }
  }

  async findOne (id: string) {
    try {
      const user = await this.prisma.module.findUnique({
        where: {
          id
        }
      })
      if (!user) {
        return `data not found with this  ${id}`
      }

      return `${JSON.stringify(user)} `
    } catch (err) {
      return { error: err }
    }
  }

  async update (id: string, updateRestApiDto: module_dto) {
    try {
      const toLowerCaseModule = updateRestApiDto?.module.toLowerCase()
      const UPDATE_USER = await this.prisma.module.update({
        where: {
          id
        },
        data: {
          module: toLowerCaseModule,
          status: updateRestApiDto?.status
        }
      })
      if (!UPDATE_USER) {
        return `user not found for this ${id}`
      }
      return `module updated ${id} `
      // }
    } catch (err) {
      return { error: err }
    }
  }

  async remove (id: string) {
    try {
      const DELETE_USER = await this.prisma.module.delete({
        where: {
          id
        }
      })
      return DELETE_USER
    } catch (err) {
      return { error: err }
    }
  }
}
