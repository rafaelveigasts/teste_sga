import { ApiProperty } from '@nestjs/swagger'

export class CreateUserResponse {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  password: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
