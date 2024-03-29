import { Module } from '@nestjs/common'
import { ParticipantsController } from './participants.controller'
import { ParticipantsService } from './participants.service'
import { PrismaService } from 'src/prisma.service'
@Module({
	controllers: [ParticipantsController],
	providers: [ParticipantsService, PrismaService],
})
export class ParticipantsModule {}
