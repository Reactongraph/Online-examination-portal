import { Injectable } from '@nestjs/common'
import { QuizDTO } from './quiz.entity'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class QuizService {
	constructor(private readonly prisma: PrismaService) {}
	async create(createQuizDto: QuizDTO) {
		// date comes in string and in db status column data type is boolean so we convert string to boolean
		try {
			const toLowerCaseQuizName = createQuizDto?.quiz_name.toLowerCase()
			const quiz_find = await this.prisma.quiz.findUnique({
				where: {
					quiz_name: toLowerCaseQuizName,
				},
			})

			if (quiz_find) {
				return null
			}
			const myBool = Boolean(createQuizDto?.status)
			const quiz = await this.prisma.quiz.create({
				data: {
					quiz_name: toLowerCaseQuizName,
					quiz_image: createQuizDto.quiz_image,
					start_date: createQuizDto.start_date,
					end_date: createQuizDto.end_date,
					buffer_time: createQuizDto.buffer_time,
					description: createQuizDto.description,
					status: myBool,
					module_id: createQuizDto?.module_id,
					level_id: createQuizDto?.level_id,
				},
			})

			return quiz
		} catch (err) {
			return { error: err }
		}
	}

	async findAll() {
		try {
			const leveldata = await this.prisma.quiz.findMany({
				include: { level: true },
			})

			const quiz: any = await this.prisma.quiz.aggregateRaw({
				pipeline: [
					{
						$lookup: {
							from: 'Module',
							localField: 'module_id',
							foreignField: '_id',
							as: 'module',
						},
					},
				],
			})

			for (const [index] of leveldata.entries()) {
				quiz[index].level = leveldata[index].level
			}
			return { quiz }
		} catch (error) {}
	}

	async findOne(id: string) {
		try {
			const quiz = await this.prisma.quiz.findMany({
				where: {
					id,
				},
				include: { level: true, module: true },
			})

			if (!quiz) {
				return `quiz not found with this  ${id}`
			}
			return quiz
		} catch (err) {
			return { error: err }
		}
	}

	async update(id: string, updateRestApiDto: QuizDTO) {
		try {
			const updateQuiz = await this.prisma.quiz.update({
				where: {
					id,
				},
				data: updateRestApiDto,
			})
			if (!updateQuiz) {
				return `quiz not found for this ${id}`
			}
			return updateQuiz
		} catch (err) {
			return { error: err }
		}
	}

	async remove(id: string) {
		try {
			const deleteQuiz = await this.prisma.quiz.delete({
				where: {
					id,
				},
			})
			return deleteQuiz
		} catch (err) {
			return err
		}
	}
}
