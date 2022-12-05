import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { LevelService } from './level.service'
import { level_dto } from './level.entity'
@Controller('level')
export class LevelController {
  constructor (private readonly Levels: LevelService) { }
  // this controller is used to create Levels
  @Post()
  async create (@Body() level: level_dto) {
    const level_create = await this.Levels.create(level)
    return level_create
  }

  // this controller is used to find all Levels data
  @Get('find')
  async findAll () {
    const level_read = await this.Levels.findAll()
    return level_read
  }

  // this controller is used to find by id Levels data
  @Get(':id')
  async findOne (@Param('id') id: string) {
    const find_one = await this.Levels.findOne(id)
    return find_one
  }

  // this controller is used to update all Levels data
  @Patch(':id')
  async update (@Param('id') id: string, @Body() update_level: level_dto) {
    console.log('id', id)
    console.log(update_level?.level)
    const update_levels = await this.Levels.update(id, update_level)
    return update_levels
  }

  // this controller is used to delete Levels data
  @Delete(':id')
  async remove (@Param('id') id: string) {
    const delete_level = await this.Levels.remove(id)
    return delete_level
  }
}
