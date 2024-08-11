import { NotFoundException } from '@nestjs/common'

export class UserNotFoundError extends NotFoundException {
  constructor() {
    super('Não foi possível localizar o usuário no banco de dados')
    this.name = 'UserNotFoundError'
  }
}
