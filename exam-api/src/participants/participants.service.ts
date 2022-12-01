import { Injectable } from '@nestjs/common'
import { participants_dto } from './participants.entity'
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma.service'
import { Participants, PrismaClient } from '@prisma/client'
const nodemailer = require('nodemailer')
@Injectable()
export class ParticipantsService {
  constructor(private prisma: PrismaService) { }
  async create(params: participants_dto) {
    try {
      console.log('in service ', params?.name)
      const name = params?.name
      const email = params?.email
      const saltOrRounds = 10
      const password = params?.password
      const hash = await bcrypt.hash(password, saltOrRounds)
      console.log('hash', hash)

      const mobile = params?.mobile
      const email_check = await this.prisma.participants.findUnique({ where: { email } })
      if (email_check) {
        return {
          message: 'user already exist',
          password: null,
          email: null
        }
      } else {
        const user = await this.prisma.participants.create(
          {
            data: {
              name: params?.name,
              email: params?.email,
              password: hash,
              mobile: params?.mobile,
              Organization_id: params?.id
            }
          }
        )
        return user
      }
    }
    catch (err) {
      return { error: err }
    }
  }

  async reset_link(email: string, password: string) {
    // console.log("id=", id);

    const mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
        user: 'glalwani177@gmail.com',
        pass: 'qbzgsqdaavnfkfxm'
      }
    })
    // console.log(token);
    // console.log("userid", id);
    const mailOptions = {
      from: 'glalwani177@gmail.com',
      to: `${email}`,
      subject: 'Participant Credentials',
      html: `<p>Welcome To Examination portal  </p> <p>Use this credentials below to login :</p> email=${email} password=${password}. <p>Thank You</p>
        <p>Customer Support</p>`
    }

    mailTransporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
        return 'mail send '
      }
    })
  }

  async findAll() {
    const users = await this.prisma.participants.findMany()
    console.log(users)

    return `${JSON.stringify(users)}`
  }

  async findOne(id: string) {
    console.log(id)
    try {

      const user = await this.prisma.participants.findUnique({
        where: {
          id
        }
      })
      console.log(user)
      if (!user) {
        return `user not found with this  ${id}`
      }

      return `${JSON.stringify(user)} `
    }
    catch (err) {
      return { error: err }
    }
  }

  async update(id: string, updateRestApiDto: participants_dto) {
    try {
      const updateUser = await this.prisma.participants.update({
        where: {
          id
        },
        data: updateRestApiDto
      })
      if (!updateUser) {
        return `user not found for this ${id}`
      }
      return `${id} `
    }
    catch (err) {
      return { error: err }
    }
  }

  async remove(id: string) {
    try {
      const delete_user = await this.prisma.participants.delete({
        where: {
          id
        }
      })
      return `This action removes a #${id} restApi`
    }
    catch (err) {
      return { error: err }
    }
  }
}