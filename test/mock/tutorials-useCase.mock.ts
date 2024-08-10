import { CreateTutorialsUseCase } from '@/domain/tutorials/use-cases/create-tutorials'
import { DeleteTutorialsUseCase } from '@/domain/tutorials/use-cases/delete-tutorial'
import { ListTutorialsUseCase } from '@/domain/tutorials/use-cases/list-tutorials'
import { PatchTutorialsUseCase } from '@/domain/tutorials/use-cases/patch-tutorials'
import { tutorialsMockResponse } from './tutorials-list.mock'

export const listTutorialUseCaseMock = {
  provide: ListTutorialsUseCase,
  useValue: {
    execute: jest.fn(),
  },
}

export const createTutorialsUseCaseMock = {
  provide: CreateTutorialsUseCase,
  useValue: {
    execute: jest.fn().mockResolvedValue(tutorialsMockResponse[0]),
  },
}

export const deleteTutorialsUseCaseMock = {
  provide: DeleteTutorialsUseCase,
  useValue: {
    execute: jest.fn(),
  },
}

export const patchTutorialsUseCaseMock = {
  provide: PatchTutorialsUseCase,
  useValue: {
    execute: jest.fn(),
  },
}
