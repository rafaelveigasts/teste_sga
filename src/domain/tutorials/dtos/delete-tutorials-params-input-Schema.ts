import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID } from 'class-validator'

export class DeleteTutorialsParamsInputSchema {
  @ApiProperty()
  @IsString()
  @IsUUID()
  id: string
}
