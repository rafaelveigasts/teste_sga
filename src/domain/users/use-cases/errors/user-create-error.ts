import { InternalServerErrorException } from '@nestjs/common'

export class UserCreateError extends InternalServerErrorException {
  constructor() {
    super('Não foi possível criar o usuário')
    this.name = 'UserCreateError'
  }
}
