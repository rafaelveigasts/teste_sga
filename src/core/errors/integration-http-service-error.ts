import { InternalServerErrorException } from '@nestjs/common'

export class IntegrationHttpServiceError extends InternalServerErrorException {
  constructor(identifier: string) {
    super(`Integration error in ${identifier}`)
  }
}
