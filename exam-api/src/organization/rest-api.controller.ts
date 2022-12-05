import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { RestApiService } from './rest-api.service';
import { CreateRestApiDto } from './dto/create-rest-api.dto';
import { UpdateRestApiDto } from './dto/update-rest-api.dto';
import { PostDTO } from './post';
import { HttpStatus, Put, Res } from "@nestjs/common"
import { JwtService } from '@nestjs/jwt';
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { Oraganization } from './rest-api.middleware';
import { Response } from 'express';
@Controller('rest-api')
export class RestApiController {
  constructor (private readonly restApiService: RestApiService, private readonly jwtService: JwtService) { }
  // this controller is used to create Oraganization data
  @Post()
  async create (@Body() createRestApiDto: PostDTO, @Res({ passthrough: true }) response: Response) {
    const user = await this.restApiService.create(createRestApiDto)
    const jwt = await this.jwtService.signAsync({ id: user.id })
    const create = await prisma.reset_token.create({
      data:
      {
        token: jwt
      }
    })
    // this controller is used to send reset link
    const reset_link = await this.restApiService.reset_link(jwt, user.id, user.email)
    return {
      message: 'mail send sucessfully!'
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
