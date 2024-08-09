import { ApiProperty } from '@nestjs/swagger'
import { IsPositive, IsString } from 'class-validator'

export class CreateTutorialsParamsInputSchema {
  @ApiProperty()
  @IsString()
  title: string
}
