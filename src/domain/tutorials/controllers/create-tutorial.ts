import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { TemplatedApiException } from '../../../core/decorators/templated-api-exception'
import { ValidationRequestException } from '../../../core/errors/validation-request-exception'
import { validationExceptionExample } from '../../../infra/utils/swagger-annotations'
import { ListTutorialsResponse } from '../dtos/list-tutorials-response'
import { CreateTutorialsParamsInputSchema } from '../dtos/create-tutorials-params-input-Schema'
import { CreateTutorialsUseCase } from '../use-cases/create-tutorials'
import { Tutorials } from '../entities/tutorials'

@Controller('/tutorials')
@ApiTags('tutorials')
@ApiBearerAuth()
export class CreateTutorialsController {
  constructor(
    private readonly createTutorialsUseCase: CreateTutorialsUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar tutoriais' })
  @ApiOkResponse({ type: ListTutorialsResponse, isArray: true })
  @TemplatedApiException(() => [
    UnauthorizedException,
    new ValidationRequestException(validationExceptionExample),
    BadRequestException,
    InternalServerErrorException,
  ])
  async handle(
    @Body() body: CreateTutorialsParamsInputSchema,
  ): Promise<Tutorials> {
    const { title } = body
    const tutorials = await this.createTutorialsUseCase.execute({
      title,
    })

    if (tutorials.isLeft()) {
      throw new NotFoundException()
    }

    return tutorials.value
  }
}
