import { Injectable } from '@nestjs/common'
import { module_dto } from './module.entity'
import { PrismaService } from 'src/prisma.service'
import { Login, Level, Prisma } from '@prisma/client'
@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) { }
  async create(params: module_dto) {
    try {



      console.log('in service ', params?.module)
      const module = params?.module
      const status = params?.status
      const toLowerCaseModule = params?.module.toLowerCase()
      const find = await this.prisma.module.findUnique({
        where: {
          module: toLowerCaseModule
        }
      })
      console.log("find", find);
      if (find != null) {
        return 'module already exist'
      }
      else {
        const users = await this.prisma.module.create({
          data: {
            module: toLowerCaseModule,
            status
          }
        }
        )
        return { message: 'module inserted' }
      }
    }
    catch (error) {
      return { error: error }
    }
  }

  async findAll() {

    const users = await this.prisma.module.findMany()
    console.log(users)

    return `${JSON.stringify(users)}`
  }

  async findOne(id: string) {
    console.log(id)
    try {


      const user = await this.prisma.module.findUnique({
        where: {
          id
        }
      })
      if (user) {
        return user
      }
      // console.log(user)
      else {
        return `data not found with this  ${id}`
      }


    } catch (error) {
      return { error: error }
    }
  }

  async update(id: string, updateRestApiDto: module_dto) {
    const toLowerCaseModule = updateRestApiDto?.module.toLowerCase()
    try {
      const find = await this.prisma.module.findUnique({
        where: {
          module: toLowerCaseModule
        }
      })
      if (find != null) {
        return { message: 'data already exist' }
      }
      else {


        const updateUser = await this.prisma.module.update({
          where: {
            id
          },
          data: {
            module: toLowerCaseModule
          }
        })

        return { message: 'data updated' }
      }
    }
    catch (err) {
      console.log("err", err);
      return { error: err }

    }
  }

  async remove(id: string) {
    try {
      const delete_user = await this.prisma.module.delete({
        where: {
          id
        }
      })
      return `This action removes a #${id} restApi`
    }
    catch (error) {
      return { error: error }
    }
  }
}
