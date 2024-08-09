import { Injectable } from '@nestjs/common'

import { Either, left, right } from '../../../core/either'
import { TutorialsRepository } from '../repositories/tutorials-repository'
import { TutorialsNotFoundError } from './errors/tutorials-not-found'
import { Tutorials } from '../entities/tutorials'

type CreateTutorialsUseCaseResponse = Either<Error, Tutorials>

type CreateTutorialsUseCaseInput = {
  title: string
}

@Injectable()
export class CreateTutorialsUseCase {
  constructor(private readonly tutorialsRepository: TutorialsRepository) {}

  async execute({
    title,
  }: CreateTutorialsUseCaseInput): Promise<CreateTutorialsUseCaseResponse> {
    const tutorials = await this.tutorialsRepository.create(title)

    if (!tutorials) {
      return left(new TutorialsNotFoundError())
    }

    return right(tutorials)
  }
}
