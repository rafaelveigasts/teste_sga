import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { DatabaseModule } from '../../infra/database/database.module'
import { EnvModule } from '../../infra/env/env.module'
import { EnvService } from '../..//infra/env/env.service'

import { AuthenticateUserUseCaseController } from './controllers/authenticate'
import { JwtAuthGuard } from './jwt/jwt-auth.guard'
import { JwtStrategy } from './jwt/jwt-auth.strategy'
import { AuthenticateUserUseCase } from './use-cases/authenticate-user'

@Module({
  imports: [
    HttpModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (envService: EnvService) => {
        const privateKey = envService.get('JWT_PRIVATE_KEY')
        const publicKey = envService.get('JWT_PUBLIC_KEY')

        return {
          signOptions: { algorithm: 'HS256', expiresIn: '8h' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        }
      },
    }),
    DatabaseModule,
  ],
  controllers: [AuthenticateUserUseCaseController],
  providers: [
    EnvService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AuthenticateUserUseCase,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
