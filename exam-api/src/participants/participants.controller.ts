import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common'
import { participants_dto } from './participants.entity'
import { ParticipantsService } from './participants.service'
@Controller('participants')
export class ParticipantsController {
  constructor (private readonly participant: ParticipantsService) { }
  // this controller is used to create participant data
  @Post()
  async create (@Body() createparticipants: participants_dto) {
    console.log(createparticipants.name)
    const participant_create = await this.participant.create(createparticipants)
    if (participant_create.email==null)
    {
      return {
        message:'user already exist'
      }
    }
    const reset_link = await this.participant.reset_link(participant_create.email, participant_create.password)
    return participant_create
  }

  // this controller is used to fina all participant data
  @Get('find')
  async findAll () {
    const participant_read = await this.participant.findAll()
    return participant_read
  }

  // this controller is used to find  participant data by id
  @Get(':id')
  async findOne (@Param('id') id: string) {
    const find_one = await this.participant.findOne(id)
    return find_one
  }

  // this controller is used to update participant data by id
  @Patch(':id')
  async update (@Param('id') id: string, @Body() updateparticipants: participants_dto) {
    console.log('id', id)
    console.log(updateparticipants?.name)
    const update_participants = await this.participant.update(id, updateparticipants)
    return update_participants
  }

  // this controller is used to delete  participant data
  @Delete(':id')
  async remove (@Param('id') id: string) {
    const delete_participants = await this.participant.remove(id)
    return delete_participants
  }
}
