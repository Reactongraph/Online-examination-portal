import { Module } from '@nestjs/common'
import { ModuleService } from './module.service'
import { ModuleController } from './module.controller'
import { PrismaService } from 'src/prisma.service'
@Module({
	providers: [ModuleService, PrismaService],
	controllers: [ModuleController],
})
export class ModuleModule {}
