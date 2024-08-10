import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { TemplatedApiException } from '../../../core/decorators/templated-api-exception'
import { ValidationRequestException } from '../../..//core/errors/validation-request-exception'

import { Public } from '../../../core/decorators/public'
import { validationExceptionExample } from '../../../infra/utils/swagger-annotations'
import { User } from '../entities/user'
import { CreateUserUseCase } from '../use-cases/create-user'
import { CreateUserParamsInputSchema } from '../dto/create-user-params-input-Schema'
import { CreateUserResponse } from '../dto/create-user-response'
import { UserCreateError } from '../use-cases/errors/user-create-error'

@Public()
@Controller('/user/signup')
@ApiTags('users')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Autenticação de usuário' })
  @ApiCreatedResponse({ type: CreateUserResponse })
  @TemplatedApiException(() => [
    new ValidationRequestException(validationExceptionExample),

    BadRequestException,
    InternalServerErrorException,
  ])
  async handle(@Body() body: CreateUserParamsInputSchema): Promise<User> {
    const { name, password } = body

    const result = await this.createUserUseCase.execute({
      name,
      password,
    })

    if (result.isLeft()) {
      throw new UserCreateError()
    }

    return result.value
  }
}
