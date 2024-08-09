import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
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
import { CreateTutorialsUseCase } from '../use-cases/create-tutorials'
import { Tutorials } from '../entities/tutorials'
import { PatchTutorialsParamsInputSchema } from '../dtos/patch-tutorials-params-input-Schema'
import { PatchTutorialsUseCase } from '../use-cases/patch-tutorials'
import { DeleteTutorialsParamsInputSchema } from '../dtos/delete-tutorials-params-input-Schema'
import { DeleteTutorialsUseCase } from '../use-cases/delete-tutorial'

@Controller('/tutorials')
@ApiTags('tutorials')
@ApiBearerAuth()
export class DeleteTutorialsController {
  constructor(
    private readonly deleteTutorialsUseCase: DeleteTutorialsUseCase,
  ) {}

  @Delete()
  @ApiOperation({ summary: 'Deletar tutoriais por id' })
  @ApiOkResponse({ type: ListTutorialsResponse, isArray: true })
  @TemplatedApiException(() => [
    UnauthorizedException,
    new ValidationRequestException(validationExceptionExample),
    BadRequestException,
    InternalServerErrorException,
  ])
  async handle(@Body() body: DeleteTutorialsParamsInputSchema): Promise<void> {
    const { id } = body
    await this.deleteTutorialsUseCase.execute({
      id,
    })
  }
}
