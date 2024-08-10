import { plainToInstance, Transform } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsString, validateSync } from 'class-validator'

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class Env {
  @Transform(({ value }) => parseInt(value, 10))
  PORT: number = 3333

  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development

  @IsString()
  DATABASE_URL: string

  @IsNotEmpty()
  @IsString()
  JWT_PRIVATE_KEY: string

  @IsNotEmpty()
  @IsString()
  JWT_PUBLIC_KEY: string
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(Env, config, {
    enableImplicitConversion: true,
  })

  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }

  return validatedConfig
}
