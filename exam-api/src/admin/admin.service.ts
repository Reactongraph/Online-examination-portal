import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service';
import { admin_dto } from './admin.entity';
@Injectable()
export class AdminService{
    constructor(
		// private readonly jwtService: JwtService,
		private readonly prisma: PrismaService
	) {}
    async  test_Service() { 
        
    }
    async findOne(id: string) {
		try {
			
			const user = await this.prisma.user_auth.findUnique({
				where: {
					id:id,
				},
			})
			
			if (!user) {
				return `data not found with this  ${id}`
			}

			return `${JSON.stringify(user)} `
		} catch (err) {
			return { error: err }
		}

    }
    async update(id: string, update_admin: admin_dto) {
		try {
            
			const toLowerCaseName = update_admin?.name.toLowerCase()
            const toLowerCaseEmail=  update_admin?.email.toLocaleLowerCase()
				const updateUser = await this.prisma.user_auth.update({
					where: {
						id,
					},
					data: {
						name: toLowerCaseName,
                        email: toLowerCaseEmail,
                        password: update_admin?.password
					},
				})

				if (!updateUser) {
					return `user not found for this ${id}`
				}
				return `super admin updated `
		} catch (err) {
            
			return { error: err }
		}
	}
}