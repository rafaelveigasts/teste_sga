import { NotFoundException } from '@nestjs/common'

export class TutorialsNotFoundError extends NotFoundException {
  constructor() {
    super('Um ou mais tutoriais não foram encontrados')
    this.name = 'TutorialsNotFoundError'
  }
}
