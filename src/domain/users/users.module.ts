import { Module } from '@nestjs/common'
import { CreateUserController } from './controllers/user-signup'
import { CreateUserUseCase } from './use-cases/create-user'
import { DatabaseModule } from '../../infra/database/database.module'
@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController],
  providers: [CreateUserUseCase],
})
export class UsersModule {}
