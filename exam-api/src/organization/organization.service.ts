import { Injectable } from '@nestjs/common'
import { PostDTO } from './post'
import { PrismaService } from 'src/prisma.service'
import { reset_token, Organization, user_auth, PrismaClient } from '@prisma/client'
const nodemailer = require('nodemailer')

@Injectable()
export class RestApiService {
  constructor(private prisma: PrismaService) { }
  async create(createRestApiDto: PostDTO) {

    console.log(createRestApiDto)

    const email_check = await this.prisma.organization.findUnique({ where: { email: createRestApiDto?.email } })
    if (email_check) {
      return {
        message: 'user already exist',
        id: null,
        email: null
      }
    } else {
      const user = await this.prisma.organization.create(
        {
          data: {
            email: createRestApiDto?.email,
            name: createRestApiDto?.name,
            quota: createRestApiDto?.quota,
            status: createRestApiDto?.status,
            mobile: createRestApiDto?.mobile,
            address: createRestApiDto?.address,
            city: createRestApiDto?.city,
            state: createRestApiDto?.state,
            pincode: createRestApiDto.pincode

          }
        }
      )
      const userauth = await this.prisma.user_auth.create(
        {
          data: {
            name: createRestApiDto?.name,
            email: createRestApiDto?.email,
            password: createRestApiDto?.password
          }
        }
      )
      return user
    }
  }

  async reset_link(token: string, id: string, email: string) {
    console.log('id=', id)

    const mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
        user: 'glalwani177@gmail.com',
        pass: 'qbzgsqdaavnfkfxm'
      }
    })
    console.log(token)
    console.log('userid', id)
    const clientURL = 'http://localhost:3000/'
    const link = `${clientURL}/passwordReset?token=${token}&id=${id}`
    console.log(link)
    const mailOptions = {
      from: 'glalwani177@gmail.com',
      to: `${email}`,
      // to:'gauravlalwani',
      subject: 'Password Reset',
      html: `<p>We have received your request to reset the password </p> <p>Use the link below to update your password:</p> <a href=' ${link}'> <button style="background:blue; color: white; font-size: 16px;">Click Here!</button></a>. <p>This link will expire in 24 hours.</p>
        <p>Thank You</p>
        <p>Customer Support</p>`
    }

    mailTransporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
        // res.status(409).send(error.message);
      } else {
        console.log('Email sent: ' + info.response)
        // res.status(200).send("Mail sent successfully" );
        return 'mail send '
      }
    })
  }

  async findAll() {

    const users = await this.prisma.organization.findMany()
    return `${JSON.stringify(users)}`
  }

  async findOne(id: string) {
    console.log(id)

    const user = await this.prisma.organization.findUnique({
      where: {
        id
      }
    })
    console.log(user)
    if (!user) {
      return `user not found with this  ${id}`
    }

    return `${JSON.stringify(user)}`
  }

  async update(id: string, updateRestApiDto: PostDTO) {
    const updateUser = await this.prisma.organization.update({
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

  async remove(id: string) {
    const delete_user = await this.prisma.organization.delete({
      where: {
        id
      }
    })
    return `${id} `
  }
}
