import { TestingModule, Test } from '@nestjs/testing'
import { TutorialsRepository } from '../repositories/tutorials-repository'
import { CreateTutorialsUseCase } from './create-tutorials'
import { Tutorials } from '../entities/tutorials'
import { tutorialsRepositoryMock } from '../../../../test/mock/repositories/tutorial-repository.mock'
import { ListTutorialsUseCase } from './list-tutorials'
import { DeleteTutorialsUseCase } from './delete-tutorial'
import { PatchTutorialsUseCase } from './patch-tutorials'
import { CACHE_MANAGER } from '@nestjs/cache-manager'

describe('[TUTORIALS USE CASE - UNIT TEST]', () => {
  let createTutorialsUseCase: CreateTutorialsUseCase
  let listTutorialsUseCase: ListTutorialsUseCase
  let deleteTutorialsUseCase: DeleteTutorialsUseCase
  let patchTutorialsUseCase: PatchTutorialsUseCase
  let tutorialsRepository: TutorialsRepository

  describe('CreateTutorialsUseCase', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [CreateTutorialsUseCase, tutorialsRepositoryMock],
      }).compile()

      createTutorialsUseCase = module.get<CreateTutorialsUseCase>(
        CreateTutorialsUseCase,
      )
      tutorialsRepository = module.get<TutorialsRepository>(TutorialsRepository)
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should be defined', () => {
      expect(createTutorialsUseCase).toBeDefined()
    })

    it('should be able to create a new tutorial', async () => {
      const tutorial: Tutorials = {
        title: 'title',
      }

      jest
        .spyOn(tutorialsRepository, 'create')
        .mockImplementation(async () => tutorial)

      const response = await createTutorialsUseCase.execute({
        title: 'title',
      })

      expect(response.isRight()).toBeTruthy()
      expect(response.value).toEqual(tutorial)
    })
  })

  describe('ListTutorialsUseCase', () => {
    beforeEach(async () => {
      const mockCacheManager = {
        set: jest.fn(),
        get: jest.fn(),
        del: jest.fn(),
        reset: jest.fn(),
      }
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ListTutorialsUseCase,
          tutorialsRepositoryMock,
          {
            provide: CACHE_MANAGER,
            useValue: mockCacheManager,
          },
        ],
      }).compile()

      listTutorialsUseCase =
        module.get<ListTutorialsUseCase>(ListTutorialsUseCase)
      tutorialsRepository = module.get<TutorialsRepository>(TutorialsRepository)
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should be defined', () => {
      expect(listTutorialsUseCase).toBeDefined()
    })

    it('should be able to list all tutorials', async () => {
      // const tutorials: Tutorials = {
      //   title: 'title',
      // }

      jest.spyOn(tutorialsRepository, 'list')
      // .mockImplementation(async () => tutorials)

      const response = await listTutorialsUseCase.execute({
        page: 0,
        quantity: 10,
      })

      expect(response.isRight()).toBeTruthy()
      // expect(response.value).toEqual(tutorials)
    })
  })
  describe('DeleteTutorialsUseCase', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [DeleteTutorialsUseCase, tutorialsRepositoryMock],
      }).compile()

      deleteTutorialsUseCase = module.get<DeleteTutorialsUseCase>(
        DeleteTutorialsUseCase,
      )
      tutorialsRepository = module.get<TutorialsRepository>(TutorialsRepository)
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should be defined', () => {
      expect(deleteTutorialsUseCase).toBeDefined()
    })

    it('should be able to delete a tutorial', async () => {
      jest.spyOn(tutorialsRepository, 'deleteById')

      const response = await deleteTutorialsUseCase.execute({ id: '1' })

      expect(response).toBeUndefined()
    })
  })
  describe('PatchTutorialsUseCase', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [PatchTutorialsUseCase, tutorialsRepositoryMock],
      }).compile()

      patchTutorialsUseCase = module.get<PatchTutorialsUseCase>(
        PatchTutorialsUseCase,
      )
      tutorialsRepository = module.get<TutorialsRepository>(TutorialsRepository)
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should be defined', () => {
      expect(patchTutorialsUseCase).toBeDefined()
    })

    it('should be able to patch a tutorial', async () => {
      jest.spyOn(tutorialsRepository, 'patch')

      const response = await patchTutorialsUseCase.execute({
        id: '1',
        title: 'title',
      })

      expect(response).not.toBeNull()
    })
  })
})
