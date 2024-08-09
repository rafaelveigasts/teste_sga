import { plainToInstance, Transform } from 'class-transformer'
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  validateSync,
} from 'class-validator'

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class Env {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development

  @Transform(({ value }) => parseInt(value, 10))
  PORT: number = 3333

  @IsString()
  DATABASE_URL: string
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
