import { ApiProperty } from '@nestjs/swagger'

export class ListTutorialsResponse {
  @ApiProperty()
  id: string

  @ApiProperty()
  title: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
