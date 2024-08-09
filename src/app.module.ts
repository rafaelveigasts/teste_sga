import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerErrorInterceptor, LoggerModule } from 'nestjs-pino'
import pinoConfig from './infra/config/pino'
import { EnvModule } from './infra/config/env/env.module'
import { DatabaseModule } from './infra/database/database.module'

import { UsersModule } from './domain/users/users.module'
import { AuthModule } from './domain/auth/auth.module'
import { HttpExceptionFilter } from './infra/http/filters/http-exception'
import { APP_PIPE, APP_INTERCEPTOR, Reflector, APP_FILTER } from '@nestjs/core'
import { ValidationRequestException } from './core/errors/validation-request-exception'
import { TutorialsModule } from './domain/tutorials/tutorials.module'
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager'
@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(pinoConfig),
    CacheModule.register({
      isGlobal: true,
      ttl: 60,
    }),
    EnvModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    TutorialsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () => {
        return new ValidationPipe({
          transform: true,
          validateCustomDecorators: true,
          exceptionFactory(errors) {
            return new ValidationRequestException(errors)
          },
        })
      },
    },
    {
      provide: APP_INTERCEPTOR,
      inject: [Reflector],
      useFactory: (reflector: Reflector) => {
        return new ClassSerializerInterceptor(reflector, {
          excludeExtraneousValues: true,
          enableImplicitConversion: true,
        })
      },
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerErrorInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
