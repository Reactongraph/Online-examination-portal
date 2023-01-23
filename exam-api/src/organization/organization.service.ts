import { Injectable } from '@nestjs/common'
import { organization_dto } from './post'
import { PrismaService } from 'src/prisma.service'
const nodemailer = require('nodemailer')

@Injectable()
export class RestApiService {
	constructor(private readonly prisma: PrismaService) {}
	async create(createRestApiDto: organization_dto) {
		try {
			const EMAIL_CHECK = await this.prisma.organization.findUnique({
				where: { email: createRestApiDto?.email },
			})

			if (EMAIL_CHECK != null) {
				return {
					message: 'user already exist',
					id: null,
					email: null,
				}
			} else {
				const user = await this.prisma.organization.create({
					data: {
						email: createRestApiDto?.email,
						name: createRestApiDto?.name,
						password: createRestApiDto?.password,
						quota: createRestApiDto?.quota,
						status: createRestApiDto?.status,
						mobile: createRestApiDto?.mobile,
						address: createRestApiDto?.address,
						city: createRestApiDto?.city,
						state: createRestApiDto?.state,
						pincode: createRestApiDto.pincode,
					},
				})
				return user
			}
		} catch (err) {
			return {
				error: err,
			}
		}
	}

	async reset_link(token: string, id: string, email: string) {
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
			const clientURL = 'http://localhost:3000/'
			const link = `${clientURL}/passwordReset?token=${token}&id=${id}`
			const mailOptions = {
				from: 'glalwani177@gmail.com',
				to: `${email}`,
				subject: 'Password Reset',
				html: `<p>We have received your request to reset the password </p> <p>Use the link below to update your password:</p> <a href=' ${link}'> <button style="background:blue; color: white; font-size: 16px;">Click Here!</button></a>. <p>This link will expire in 24 hours.</p>
        <p>Thank You</p>
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
			const users = await this.prisma.organization.findMany()
			return `${JSON.stringify(users)}`
		} catch (err) {
			return { error: err }
		}
	}

	async findOne(id: string) {
		try {
			const user = await this.prisma.organization.findUnique({
				where: {
					id,
				},
			})
			if (!user) {
				return `user not found with this  ${id}`
			}

			return `${JSON.stringify(user)}`
		} catch (error) {}
	}

	async update(id: string, updateRestApiDto: organization_dto) {
		try {
			const updateUser = await this.prisma.organization.update({
				where: {
					id,
				},
				data: updateRestApiDto,
			})
			if (!updateUser) {
				return `user not found for this ${id}`
			}
			return ' organization updated  '
		} catch (error) {}
	}

	async remove(id: string) {
		try {
			const DELETE_USER = await this.prisma.organization.delete({
				where: {
					id,
				},
			})
			return DELETE_USER
		} catch (error) {}
	}
}
