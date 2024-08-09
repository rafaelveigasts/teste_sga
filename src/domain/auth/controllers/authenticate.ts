import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { TemplatedApiException } from '@/core/decorators/templated-api-exception'
import { ValidationRequestException } from '@/core/errors/validation-request-exception'

import {
  AuthenticateUserBodyRequest,
  AuthenticateUserResponse,
} from '../dtos/user-autentication-dto'
import { AuthenticateUserUseCase } from '../use-cases/authenticate-user'
import { WrongCredentialsError } from '../use-cases/erros/wrong-credentials-error'
import { Public } from '@/core/decorators/public'
import { validationExceptionExample } from '@/infra/utils/swagger-annotations'

@Public()
@Controller('/user/login')
@ApiTags('users')
export class AuthenticateUserUseCaseController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Autenticação de usuário' })
  @ApiCreatedResponse({ type: AuthenticateUserResponse })
  @TemplatedApiException(() => [
    new ValidationRequestException(validationExceptionExample),
    WrongCredentialsError,
    BadRequestException,
    InternalServerErrorException,
  ])
  async handle(
    @Body() body: AuthenticateUserBodyRequest,
  ): Promise<AuthenticateUserResponse> {
    const { name, password } = body

    const result = await this.authenticateUserUseCase.execute({
      name,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
