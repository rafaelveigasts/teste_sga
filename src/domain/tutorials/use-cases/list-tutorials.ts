import { Inject, Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { TutorialsRepository } from '../repositories/tutorials-repository'
import { TutorialsNotFoundError } from './errors/tutorials-not-found'
import { Tutorials } from '../entities/tutorials'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

type ListTutorialsUseCaseResponse = Either<TutorialsNotFoundError, Tutorials[]>

type ListTutorialsUseCaseParams = {
  page: number
  quantity: number
  date?: Date
  title?: string
}

@Injectable()
export class ListTutorialsUseCase {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly tutorialsRepository: TutorialsRepository,
  ) {}

  async execute({
    page,
    quantity,
    date,
    title,
  }: ListTutorialsUseCaseParams): Promise<ListTutorialsUseCaseResponse> {
    const tutorials = await this.cacheManager.get('tutorials')

    if (!tutorials) {
      const tutorialsOnDb = await this.tutorialsRepository.list(
        page,
        quantity,
        date,
        title,
      )

      if (!tutorialsOnDb) {
        return left(new TutorialsNotFoundError())
      }

      await this.cacheManager.set('tutorials', tutorialsOnDb)

      return right(tutorialsOnDb)
    }

    console.log('from cache')
    console.log(tutorials)

    return right<TutorialsNotFoundError, Tutorials[]>(tutorials as Tutorials[])
  }
}
