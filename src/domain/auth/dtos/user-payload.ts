import { IsNotEmpty, IsString } from 'class-validator'

export class UserPayload {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  password: string
}
