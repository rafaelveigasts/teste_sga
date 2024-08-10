import { TutorialsRepository } from '../../src/domain//tutorials/repositories/tutorials-repository'

export const tutorialsRepositoryMock = {
  provide: TutorialsRepository,
  useValue: {
    create: jest.fn(),
    list: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
  },
}
