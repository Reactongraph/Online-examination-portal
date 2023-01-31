import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common'
import { LevelService } from './level.service'
import { level_dto } from './level.entity'
import { ApiTags } from '@nestjs/swagger'
import { Res } from '@nestjs/common/decorators'
import { Response } from 'express'
import { HttpStatus } from '@nestjs/common/enums'
@Controller('level')
@ApiTags('Level')
export class LevelController {
	constructor(private readonly Levels: LevelService) {}
	// this controller is used to create Levels
	@Post()
	async create(
		@Body() level: level_dto,
		@Res({ passthrough: true }) response: Response
	) {
		const level_create = await this.Levels.create(level)
		if (level_create === null) {
			response.status(HttpStatus.BAD_REQUEST).json([])
		}
		return level_create
	}

	// this controller is used to find all Levels data
	@Get('find')
	async findAll() {
		const level_read = await this.Levels.findAll()
		return level_read
	}

	// this controller is used to find by id Levels data
	@Get(':id')
	async findOne(@Param('id') id: string) {
		const find_one = await this.Levels.findOne(id)
		return find_one
	}

	// this controller is used to update all Levels data
	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() update_level: level_dto,
		@Res({ passthrough: true }) response: Response
	) {
		const update_levels = await this.Levels.update(id, update_level)
		if (update_levels === null) {
			response.status(HttpStatus.BAD_REQUEST).json([])
		}

		return update_levels
	}

	// this controller is used to delete Levels data
	@Delete(':id')
	async remove(@Param('id') id: string) {
		const delete_level = await this.Levels.remove(id)
		return delete_level
	}
}
