import { Injectable } from '@nestjs/common';
import { PostDTO } from './post';
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const nodemailer = require('nodemailer');

@Injectable()
export class RestApiService {
  async create(createRestApiDto: PostDTO) {
    prisma.$connect();


    console.log(createRestApiDto);

    const email_check = await prisma.Organization.findUnique({ where: { email: createRestApiDto?.email }, });
    // console.log(email_check.email);
    if (email_check) {
      return 'user already exist!'
    }
    else {

      const user = await prisma.Organization.create(
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
      const userauth = await prisma.user_auth.create(
        {
          data: {
            name: createRestApiDto?.name,
            email: createRestApiDto?.email,
            password: createRestApiDto?.password
          }
        }
      )
      return user;
    }
  }
  async reset_link(token: string, id: string, email: string) {
    console.log("id=", id);

    let mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
        user: 'glalwani177@gmail.com',
        pass: 'qbzgsqdaavnfkfxm'
      }
    })
    console.log(token);
    console.log("userid", id);
    const clientURL = 'http://localhost:3000/'
    const link = `${clientURL}/passwordReset?token=${token}&id=${id}`;
    console.log(link);
    let mailOptions = {
      from: "glalwani177@gmail.com",
      to: `${email}`,
      // to:'gauravlalwani',
      subject: "Password Reset",
      html: `<p>We have received your request to reset the password </p> <p>Use the link below to update your password:</p> <a href=' ${link}'> <button style="background:blue; color: white; font-size: 16px;">Click Here!</button></a>. <p>This link will expire in 24 hours.</p>
        <p>Thank You</p>
        <p>Customer Support</p>`
    }

    mailTransporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        // res.status(409).send(error.message);
      } else {
        console.log('Email sent: ' + info.response);
        // res.status(200).send("Mail sent successfully" );
        return 'mail send '
      }
    });


  }


  async findAll() {
    prisma.$connect();
    const users = await prisma.Organization.findMany()
    return `${JSON.stringify(users)}`;
  }
  async findOne(id: string) {
    console.log(id);

    const user = await prisma.Organization.findUnique({
      where: {
        id: id,
      },
    })
    console.log(user);
    if (!user) {
      return `user not found with this  ${id}`
    }

    return `${JSON.stringify(user)}`;
  }

  async update(id: string, updateRestApiDto: PostDTO) {
    const updateUser = await prisma.Organization.update({
      where: {
        id: id,
      },
      data: updateRestApiDto
    })
    if (!updateUser) {
      return `user not found for this ${id}`
    }
    return `${id} `;
  }

  async remove(id: string) {
    const delete_user = await prisma.Organization.delete({
      where: {
        id: id
      },
    })
    return `${id} `;
  }
}
