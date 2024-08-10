import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Patch,
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
import { Tutorials } from '../entities/tutorials'
import { PatchTutorialsParamsInputSchema } from '../dtos/patch-tutorials-params-input-Schema'
import { PatchTutorialsUseCase } from '../use-cases/patch-tutorials'

@Controller('/tutorials')
@ApiTags('tutorials')
@ApiBearerAuth()
export class PatchTutorialsController {
  constructor(private readonly patchTutorialsUseCase: PatchTutorialsUseCase) {}

  @Patch()
  @ApiOperation({ summary: 'Atualizar tutoriais por id' })
  @ApiOkResponse({ type: ListTutorialsResponse, isArray: true })
  @TemplatedApiException(() => [
    UnauthorizedException,
    new ValidationRequestException(validationExceptionExample),
    BadRequestException,
    InternalServerErrorException,
  ])
  async handle(
    @Body() body: PatchTutorialsParamsInputSchema,
  ): Promise<Tutorials> {
    const { id, title } = body
    const tutorials = await this.patchTutorialsUseCase.execute({
      id,
      title,
    })

    if (tutorials.isLeft()) {
      throw new NotFoundException()
    }

    return tutorials.value
  }
}
