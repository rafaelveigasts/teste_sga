import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Query,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { TemplatedApiException } from '@/core/decorators/templated-api-exception'
import { ValidationRequestException } from '@/core/errors/validation-request-exception'
import { validationExceptionExample } from '@/infra/utils/swagger-annotations'
import { ListTutorialsResponse } from '../dtos/list-tutorials-response'
import { ListTutorialsUseCase } from '../use-cases/list-tutorials'
import { ListTutorialsParamsQuerySchema } from '../dtos/list-tutorials-params-query-Schema'

@Controller('/tutorials')
@ApiTags('tutorials')
@ApiBearerAuth()
export class ListTutorialsController {
  constructor(private readonly listTutorialsUseCase: ListTutorialsUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Listar tutoriais' })
  @ApiOkResponse({ type: ListTutorialsResponse, isArray: true })
  @TemplatedApiException(() => [
    UnauthorizedException,
    new ValidationRequestException(validationExceptionExample),
    BadRequestException,
    InternalServerErrorException,
  ])
  async handle(
    @Query() query: ListTutorialsParamsQuerySchema,
  ): Promise<ListTutorialsResponse[]> {
    console.log('query', query)

    const tutorials = await this.listTutorialsUseCase.execute({
      page: query.page,
      quantity: query.quantity,
      date: query.date,
      title: query.title,
    })

    if (tutorials.isLeft()) {
      throw new NotFoundException()
    }

    return tutorials.value
  }
}
