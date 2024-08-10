import { TutorialsRepository } from '../../../src/domain/tutorials/repositories/tutorials-repository'
import { tutorialsMockResponse } from '../tutorials-list.mock'

export const tutorialsRepositoryMock = {
  provide: TutorialsRepository,
  useValue: {
    create: jest.fn(),
    list: jest.fn().mockResolvedValue(tutorialsMockResponse),
    deleteById: jest.fn(),
    patch: jest.fn(),
    findById: jest.fn().mockResolvedValue(tutorialsMockResponse[0]),
  },
}
