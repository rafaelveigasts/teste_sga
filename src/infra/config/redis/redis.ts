import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'

@Injectable()
export class RedisService extends Redis {
  constructor() {
    super()

    super.on('error', err => {
      console.log(`Error: ${err} while connecting to Redis`)
      process.exit(1)
    })

    super.on('connect', () => {
      console.log('Connected to Redis')
    })
  }
}
