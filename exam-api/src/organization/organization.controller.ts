import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, HttpStatus, Put, Res } from '@nestjs/common'
import { RestApiService } from './organization.service'
import { CreateRestApiDto } from './dto/create-rest-api.dto'
import { UpdateRestApiDto } from './dto/update-rest-api.dto'
import { PostDTO } from './post'
import { JwtService } from '@nestjs/jwt'
import { Oraganization } from './organization.middleware'
import { PrismaService } from 'src/prisma.service'
import { reset_token,PrismaClient } from '@prisma/client'
import { Response } from 'express'

@Controller('rest-api')
export class RestApiController {
  constructor (private readonly restApiService: RestApiService, private readonly jwtService: JwtService,private prisma:PrismaService) { }
  // this controller is used to create Oraganization data
  @Post()
  async create (@Body() createRestApiDto: PostDTO, @Res({ passthrough: true }) response: Response) {
    const user = await this.restApiService.create(createRestApiDto)
    console.log("user",user);
    if (user.id==null)
    {
      return {
        message:'user already exist'
      }
    }
    else {
      const jwt = await this.jwtService.signAsync({ id: user.id })
      const create = await this.prisma.reset_token.create({
        data:
        {
          token: jwt
        }
      })
      const reset_link = await this.restApiService.reset_link(jwt, user.id, user.email)
      return {
        message:'email-send'
      }
    }

  
  }

  // this controller is used to Read all Oraganization data
  @Get('find')
  async findAll (@Headers('xaccesstoken') Headers) {
    return await this.restApiService.findAll()
  }

  // this controller is used to read by id Oraganization data
  @Get(':id')
  async findOne (@Param('id') id: string) {
    return await this.restApiService.findOne(id)
  }

  // this controller is used to update Oraganization data
  @Patch(':id')
  async update (@Param('id') id: string, @Body() updateRestApiDto: PostDTO) {
    return await this.restApiService.update(id, updateRestApiDto)
  }

  // this controller is used to delete Oraganization data
  @Delete(':id')
  async remove (@Param('id') id: string) {
    return await this.restApiService.remove(id)
  }
}
