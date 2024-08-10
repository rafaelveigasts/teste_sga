import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateTutorialsParamsInputSchema {
  @ApiProperty()
  @IsString()
  title: string
}
