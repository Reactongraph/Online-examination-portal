import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { module_dto } from './module.entity';
import { ModuleService } from './module.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('module')
@ApiTags('Module')
export class ModuleController {
  constructor(private readonly Modules: ModuleService) {}
  // this controller is used to create Module
  @Post()
  async create(@Body() module: module_dto) {
    const MODULE_CREATE = await this.Modules.create(module);
    return `${MODULE_CREATE}`;
  }

  // this controller is used to find all  Module
  @Get('find')
  async findAll() {
    const MODULE_READ = await this.Modules.findAll();
    return MODULE_READ;
  }

  // this controller is used to find Module by id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const FIND_ONE = await this.Modules.findOne(id);
    return FIND_ONE;
  }

  // this controller is used to update Module
  @Patch(':id')
  async update(@Param('id') id: string, @Body() update_module: module_dto) {
    const UPDATE_MODULE = await this.Modules.update(id, update_module);
    return UPDATE_MODULE;
  }

  // this controller is used to delete Module
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const DELETE_MODULE = await this.Modules.remove(id);
    return DELETE_MODULE;
  }
}
