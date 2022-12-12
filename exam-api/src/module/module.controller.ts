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
    const module_create = await this.Modules.create(module);
    return `${module_create}`;
  }

  // this controller is used to find all  Module
  @Get('find')
  async findAll() {
    const module_read = await this.Modules.findAll();
    return module_read;
  }

  // this controller is used to find Module by id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const find_one = await this.Modules.findOne(id);
    return find_one;
  }

  // this controller is used to update Module
  @Patch(':id')
  async update(@Param('id') id: string, @Body() update_module: module_dto) {
    const update_Module = await this.Modules.update(id, update_module);
    return update_Module;
  }

  // this controller is used to delete Module
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const delete_Module = await this.Modules.remove(id);
    return delete_Module;
  }
}
