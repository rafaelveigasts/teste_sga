import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { UserRepository } from '@/domain/users/repositories/user-repository'
import { PrismaUsersRepository } from './repositories/users/prisma-users-repository'
import { TutorialsRepository } from '@/domain/tutorials/repositories/tutorials-repository'
import { PrismaTutorialsRepository } from './repositories/tutorials/prisma-tutorials-repository'
import { RedisRepository } from './repositories/cache/redis-repository'
import { RedisService } from '../config/redis/redis'

@Module({
  providers: [
    PrismaService,
    RedisService,
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: TutorialsRepository,
      useClass: PrismaTutorialsRepository,
    },
  ],
  exports: [PrismaService, UserRepository, TutorialsRepository],
})
export class DatabaseModule {}
