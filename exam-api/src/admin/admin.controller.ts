import {
  Controller,
  Post,
  Body,
  Headers,
  Res,
  HttpStatus,
  Get,
  Req,
  Param,
  Patch
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AdminService } from './admin.service'
import { Response } from 'express'
import { admin_dto } from './admin.entity'

@Controller('admin')
export class AdminController {
  constructor (
    private readonly adminService: AdminService,
    private readonly prisma: PrismaService
  ) {}

  @Get(':id')
  async findOne (@Param('id') id: string) {
    const find_one = await this.adminService.findOne(id)

    return find_one
  }

  @Patch(':id')
  async update (
  @Param('id') id: string,
    @Body() update_admin: admin_dto,
    @Res({ passthrough: true }) response: Response
  ) {
    const update_levels = await this.adminService.update(id, update_admin)
    if (update_levels === null) {
      response.status(HttpStatus.BAD_REQUEST).json([])
    }

    return update_levels
  }
}
