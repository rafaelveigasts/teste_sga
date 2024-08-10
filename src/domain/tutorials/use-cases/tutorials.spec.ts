import { TestingModule, Test } from '@nestjs/testing'
import { TutorialsRepository } from '../repositories/tutorials-repository'
import { CreateTutorialsUseCase } from './create-tutorials'
import { Tutorials } from '../entities/tutorials'
import { tutorialsRepositoryMock } from '../../../../test/mock/tutorial-repository.mock'
import { ListTutorialsUseCase } from './list-tutorials'
import { DeleteTutorialsUseCase } from './delete-tutorial'
import { PatchTutorialsUseCase } from './patch-tutorials'

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

  // describe('ListTutorialsUseCase', () => {
  //   beforeEach(async () => {
  //     const module: TestingModule = await Test.createTestingModule({
  //       providers: [ListTutorialsUseCase, tutorialsRepositoryMock],
  //     }).compile()

  //     listTutorialsUseCase =
  //       module.get<ListTutorialsUseCase>(ListTutorialsUseCase)
  //     tutorialsRepository = module.get<TutorialsRepository>(TutorialsRepository)
  //   })

  //   afterEach(() => {
  //     jest.clearAllMocks()
  //   })

  //   it('should be defined', () => {
  //     expect(listTutorialsUseCase).toBeDefined()
  //   })

  //   it('should be able to list all tutorials', async () => {
  //     const tutorials: Tutorials = {
  //       title: 'title',
  //     }

  //     jest
  //       .spyOn(tutorialsRepository, 'list')
  //       .mockImplementation(async () => tutorials)

  //     const response = await listTutorialsUseCase.execute({
  //       page: 0,
  //       quantity: 10,
  //     })

  //     expect(response.isRight()).toBeTruthy()
  //     expect(response.value).toEqual(tutorials)
  //   })
  // })
})
