import { Injectable } from '@nestjs/common'
import { participants_dto } from './participants.entity'
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma.service'
const nodemailer = require('nodemailer')
@Injectable()
export class ParticipantsService {
	constructor(private readonly prisma: PrismaService) {}
	async create(params: participants_dto) {
		try {
			const email = params?.email
			const saltOrRounds = 10
			const password = params?.password
			const hash = await bcrypt.hash(password, saltOrRounds)
			const EMAIL_CHECK = await this.prisma.participants.findUnique({
				where: { email },
			})
			if (EMAIL_CHECK) {
				return {
					message: 'user already exist',
					password: null,
					email: null,
				}
			} else {
				const user = await this.prisma.participants.create({
					data: {
						name: params?.name,
						email: params?.email,
						password,
						mobile: params?.mobile,
						Organization_id: params?.id,
					},
				})
				return user
			}
		} catch (err) {
			return { error: err }
		}
	}

	async reset_link(email: string, password: string) {
		try {
			const mailTransporter = nodemailer.createTransport({
				service: 'gmail',
				host: 'smtp.gmail.com',
				secure: false,
				auth: {
					user: 'glalwani177@gmail.com',
					pass: 'qbzgsqdaavnfkfxm',
				},
			})
			const mailOptions = {
				from: 'glalwani177@gmail.com',
				to: `${email}`,
				subject: 'Participant Credentials',
				html: `<p>Welcome To Examination portal  </p> <p>Use this credentials below to login :</p> email=${email} password=${password}. <p>Thank You</p>
          <p>Customer Support</p>`,
			}

			mailTransporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					return error
				} else {
					return { message: 'Email send:', Response: info.response }
				}
			})
		} catch (err) {
			return { error: err }
		}
	}

	async findAll() {
		try {
			const users = await this.prisma.participants.findMany()
			return `${JSON.stringify(users)}`
		} catch (err) {
			return { error: err }
		}
	}

	async findParticipantId(id: string) {
		try {
			const find_data = await this.prisma.participants.findMany({
				where: { Organization_id: id },
			})

			return find_data
		} catch (err) {
			return { error: err }
		}
	}

	async findOne(id: string) {
		try {
			const user = await this.prisma.participants.findUnique({
				where: {
					id,
				},
			})
			if (!user) {
				return `user not found with this  ${id}`
			}

			return `${JSON.stringify(user)} `
		} catch (err) {
			return { error: err }
		}
	}

	async update(id: string, updateRestApiDto: participants_dto) {
		try {
			const updateUser = await this.prisma.participants.update({
				where: {
					id,
				},
				data: updateRestApiDto,
			})

			if (!updateUser) {
				return `user not found for this ${id}`
			}
			return { message: 'updated', data: updateUser }
		} catch (err) {
			return { error: err }
		}
	}

	async remove(id: string) {
		try {
			const DELETE_USER = await this.prisma.participants.delete({
				where: {
					id,
				},
			})
			return DELETE_USER
		} catch (err) {}
	}
}
