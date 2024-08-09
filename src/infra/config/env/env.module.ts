import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { validate } from './env'
import { EnvService } from './env.service'

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
