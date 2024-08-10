import { Module } from '@nestjs/common'
import { ListTutorialsController } from './controllers/list-tutorials'
import { ListTutorialsUseCase } from './use-cases/list-tutorials'
import { DatabaseModule } from '../../infra/database/database.module'
import { CreateTutorialsController } from './controllers/create-tutorial'
import { CreateTutorialsUseCase } from './use-cases/create-tutorials'
import { PatchTutorialsController } from './controllers/patch-tutorial'
import { PatchTutorialsUseCase } from './use-cases/patch-tutorials'
import { DeleteTutorialsController } from './controllers/delete-tutorial'
import { DeleteTutorialsUseCase } from './use-cases/delete-tutorial'

@Module({
  imports: [DatabaseModule],
  controllers: [
    ListTutorialsController,
    CreateTutorialsController,
    PatchTutorialsController,
    DeleteTutorialsController,
  ],
  providers: [
    ListTutorialsUseCase,
    CreateTutorialsUseCase,
    PatchTutorialsUseCase,
    DeleteTutorialsUseCase,
  ],
})
export class TutorialsModule {}
