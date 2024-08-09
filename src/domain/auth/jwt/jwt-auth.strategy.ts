import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { EnvService } from '@/infra/env/env.service'

import { UserPayload } from '../dtos/user-payload'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(envService: EnvService) {
    const publicKey = envService.get('JWT_PUBLIC_KEY')

    console.log(publicKey)

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['HS256'],
      secretOrKey: Buffer.from(publicKey, 'base64'),
    })
  }

  async validate(payload: UserPayload) {
    return payload
  }
}
