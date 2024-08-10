import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { Either, right } from '../../../core/either'
import { UserRepository } from '../../users/repositories/user-repository'
import { WrongCredentialsError } from './erros/wrong-credentials-error'
import { UserPayload } from '../dtos/user-payload'

type AuthenticateUserUseCaseRequest = {
  name: string
  password: string
}

type AuthenticateUserUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UserRepository,
  ) {}

  async execute({
    name,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    let userOnDatabase = await this.usersRepository.findByUsername(name)

    if (!userOnDatabase) {
      userOnDatabase = await this.usersRepository.create(name, password)
    }

    const payload: UserPayload = {
      name,
      password,
    }

    const accessToken = this.jwtService.sign(payload)

    return right({
      accessToken,
    })
  }
}
