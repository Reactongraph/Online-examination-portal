import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RestApiService } from './organization.service';
import { organization_dto } from './post';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Organization')
@Controller('organization')
export class RestApiController {
  constructor(
    private readonly restApiService: RestApiService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  // this controller is used to create Oraganization data
  @Post()
  async create(@Body() createRestApiDto: organization_dto) {
    const user = await this.restApiService.create(createRestApiDto);
    if (user.id == null) {
      return {
        message: 'user already exist',
      };
    } else {
      const jwt = await this.jwtService.signAsync({ id: user.id });
      await this.prisma.reset_token.create({
        data: {
          token: jwt,
        },
      });
      await this.restApiService.reset_link(jwt, user.id, user.email);
      return {
        message: 'email-send',
      };
    }
  }

  // this controller is used to Read all Oraganization data
  @Get('find')
  async findAll() {
    return await this.restApiService.findAll();
  }

  // this controller is used to read by id Oraganization data
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.restApiService.findOne(id);
  }

  // this controller is used to update Oraganization data
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRestApiDto: organization_dto,
  ) {
    return await this.restApiService.update(id, updateRestApiDto);
  }

  // this controller is used to delete Oraganization data
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.restApiService.remove(id);
  }
}
