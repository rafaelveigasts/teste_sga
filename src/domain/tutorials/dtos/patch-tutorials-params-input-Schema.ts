import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class PatchTutorialsParamsInputSchema {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsString()
  title: string
}
