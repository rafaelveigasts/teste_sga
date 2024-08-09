import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsPositive,
  IsInt,
  IsNumber,
  IsOptional,
  IsDate,
  IsString,
} from 'class-validator'
import { Transform, Type } from 'class-transformer'

export class ListTutorialsParamsQuerySchema {
  @ApiProperty()
  // @IsPositive()
  @IsInt()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  page: number

  @ApiProperty()
  @IsPositive()
  @IsInt()
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  quantity: number

  @ApiProperty()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string

  @ApiPropertyOptional()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  date?: Date
}
