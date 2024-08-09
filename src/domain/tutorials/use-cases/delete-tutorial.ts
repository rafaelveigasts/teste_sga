import { Injectable } from '@nestjs/common'

import { TutorialsRepository } from '../repositories/tutorials-repository'
import { TutorialsNotFoundError } from './errors/tutorials-not-found'
type DeleteTutorialsUseCaseInput = {
  id: string
}

@Injectable()
export class DeleteTutorialsUseCase {
  constructor(private readonly tutorialsRepository: TutorialsRepository) {}

  async execute({ id }: DeleteTutorialsUseCaseInput): Promise<void> {
    const tutorials = await this.tutorialsRepository.findById(id)

    if (!tutorials) {
      throw new TutorialsNotFoundError()
    }

    await this.tutorialsRepository.deleteById(id)
  }
}
