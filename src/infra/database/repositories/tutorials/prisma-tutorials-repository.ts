import { TutorialsRepository } from '@/domain/tutorials/repositories/tutorials-repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Tutorials } from '@/domain/tutorials/entities/tutorials'

@Injectable()
export class PrismaTutorialsRepository implements TutorialsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list(
    page: number,
    quantity: number,
    date?: Date,
    title?: string,
  ): Promise<Tutorials[] | null> {
    console.log(page, quantity, date, title)
    const tutorials = await this.prisma.tutorial.findMany({
      skip: page,
      take: quantity,
      where: {
        AND: {
          OR: [
            { createdAt: date ? { equals: date } : undefined },
            { updatedAt: date ? { equals: date } : undefined },
          ],
        },
        title: title ? { contains: title } : undefined,
      },
    })

    if (!tutorials) {
      return null
    }

    return tutorials
  }

  async create(title: string): Promise<Tutorials> {
    const tutorial = await this.prisma.tutorial.create({
      data: {
        title,
      },
    })

    return tutorial
  }

  async patch(id: string, title: string): Promise<Tutorials> {
    const tutorial = await this.prisma.tutorial.update({
      where: {
        id,
      },
      data: {
        title,
      },
    })

    return tutorial
  }

  async findById(id: string): Promise<Tutorials | null> {
    const tutorial = await this.prisma.tutorial.findFirst({
      where: {
        id,
      },
    })

    if (!tutorial) {
      return null
    }

    return tutorial
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.tutorial.delete({
      where: {
        id,
      },
    })
  }
}
