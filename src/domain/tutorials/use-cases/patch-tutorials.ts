import { Injectable } from '@nestjs/common'

import { Either, left, right } from '../../../core/either'
import { TutorialsRepository } from '../repositories/tutorials-repository'
import { TutorialsNotFoundError } from './errors/tutorials-not-found'
import { Tutorials } from '../entities/tutorials'

type PatchTutorialsUseCaseResponse = Either<Error, Tutorials>

type PatchTutorialsUseCaseInput = {
  id: string
  title: string
}

@Injectable()
export class PatchTutorialsUseCase {
  constructor(private readonly tutorialsRepository: TutorialsRepository) {}

  async execute({
    id,
    title,
  }: PatchTutorialsUseCaseInput): Promise<PatchTutorialsUseCaseResponse> {
    const tutorials = await this.tutorialsRepository.patch(id, title)

    if (!tutorials) {
      return left(new TutorialsNotFoundError())
    }

    return right(tutorials)
  }
}
