import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/either'
import { TutorialsRepository } from '../repositories/tutorials-repository'
import { TutorialsNotFoundError } from './errors/tutorials-not-found'
import { Tutorials } from '../entities/tutorials'

type ListTutorialsUseCaseResponse = Either<TutorialsNotFoundError, Tutorials[]>

type ListTutorialsUseCaseParams = {
  page: number
  quantity: number
  date?: Date
  title?: string
}

@Injectable()
export class ListTutorialsUseCase {
  constructor(private readonly tutorialsRepository: TutorialsRepository) {}

  async execute({
    page,
    quantity,
    date,
    title,
  }: ListTutorialsUseCaseParams): Promise<ListTutorialsUseCaseResponse> {
    const tutorials = await this.tutorialsRepository.list(
      page,
      quantity,
      date,
      title,
    )

    if (!tutorials) {
      return left(new TutorialsNotFoundError())
    }

    return right(tutorials)
  }
}
