import { UnauthorizedException } from '@nestjs/common'

export class WrongCredentialsError extends UnauthorizedException {
  constructor() {
    super(
      'Não foi possível fazer o login. Por favor, verifique o nome de usuário e senha.',
    )
  }
}
