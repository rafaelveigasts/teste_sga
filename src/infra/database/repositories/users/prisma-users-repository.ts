import { UserRepository } from '@/domain/users/repositories/user-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { User } from '@/domain/users/entities/user'

@Injectable()
export class PrismaUsersRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsername(name: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        name,
      },
    })

    if (!user) return null

    return user
  }

  async create(name: string, password: string): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name,
        password,
      },
    })

    return user
  }
}
