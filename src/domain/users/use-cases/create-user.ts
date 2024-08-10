import { Injectable } from '@nestjs/common'

import { Either, left, right } from '../../../core/either'
import { UserRepository } from '../repositories/user-repository'
import { UserCreateError } from './errors/user-create-error'

import { User } from '../entities/user'

type CreateUserUseCaseResponse = Either<Error, User>

type CreateUserUseCaseInput = {
  name: string
  password: string
}

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    name,
    password,
  }: CreateUserUseCaseInput): Promise<CreateUserUseCaseResponse> {
    const user = await this.userRepository.create(name, password)

    if (!user) {
      return left(new UserCreateError())
    }

    return right(user)
  }
}
