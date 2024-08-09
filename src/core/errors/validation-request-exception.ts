import { BadRequestException } from '@nestjs/common'
import { ValidationError } from 'class-validator'

export class ValidationRequestException extends BadRequestException {
  constructor(erros: ValidationError[] = []) {
    const body = erros.map(error => ({
      property: error.property,
      constraints: Object.values(error.constraints ?? {}),
    }))

    super({ message: body })
    this.name = 'ValidationRequestException'
  }
}
