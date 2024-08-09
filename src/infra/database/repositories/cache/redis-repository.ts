import { Tutorials } from '@/domain/tutorials/entities/tutorials'
import { RedisService } from '@/infra/config/redis/redis'
import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { TutorialsRepository } from '@/domain/tutorials/repositories/tutorials-repository'

@Injectable()
export class RedisRepository {
  constructor(
    private readonly prismaTutorialsRepository: TutorialsRepository,
    private readonly redis: RedisService,
  ) {}
  async findManyCachedTutorials(
    page: number,
    quantity: number,
  ): Promise<Tutorials[] | null> {
    const cachedTutorials = await this.redis.get('tutorials')

    if (!cachedTutorials) {
      const tutorials = await this.prismaTutorialsRepository.list(
        page,
        quantity,
      )
      await this.redis.set('tutorials', JSON.stringify(tutorials), 'EX', 6)
      // console.log('From database')
      Logger.log('From database')
      return tutorials
    }

    Logger.log('From cache')
    // console.log('From cache')

    return JSON.parse(cachedTutorials)
  }
}
