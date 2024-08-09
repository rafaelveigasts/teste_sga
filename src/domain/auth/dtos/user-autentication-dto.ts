import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class AuthenticateUserBodyRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string
}

export class AuthenticateUserResponse {
  @ApiProperty()
  access_token: string
}
