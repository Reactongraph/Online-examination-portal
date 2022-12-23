import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { participants_dto } from './participants.entity';
import { ParticipantsService } from './participants.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Patricipants')
@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participant: ParticipantsService) {}
  // this controller is used to create participant data
  @Post()
  async create(@Body() createparticipants: participants_dto) {
    const PATRICPANT_CREATE = await this.participant.create(createparticipants);
    if (PATRICPANT_CREATE.email == null) {
      return {
        message: 'user already exist',
      };
    }
    await this.participant.reset_link(
      PATRICPANT_CREATE.email,
      PATRICPANT_CREATE.password,
    );
    return PATRICPANT_CREATE;
  }

  // this controller is used to fina all participant data
  @Get('find')
  async findAll() {
    const PARTICIPANT_READ = await this.participant.findAll();
    return PARTICIPANT_READ;
  }

  // this controller is used to find  participant data by id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const FIND_ONE = await this.participant.findOne(id);
    return FIND_ONE;
  }

  // this controller is used to update participant data by id
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateparticipants: participants_dto,
  ) {
    const UPDATE_PARTICIPANTS = await this.participant.update(
      id,
      updateparticipants,
    );
    return UPDATE_PARTICIPANTS;
  }

  // this controller is used to delete  participant data
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const DELETE_PARTICIPANTS = await this.participant.remove(id);
    return DELETE_PARTICIPANTS;
  }
}
