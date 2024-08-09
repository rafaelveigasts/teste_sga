import { TestingModule, Test } from '@nestjs/testing'
import { TutorialsRepository } from '../repositories/tutorials-repository'
import { CreateTutorialsUseCase } from './create-tutorials'
import { TutorialsNotFoundError } from './errors/tutorials-not-found'
import { Tutorials } from '../entities/tutorials'
import { tutorialsRepositoryMock } from '../../../test/user-Repository.mock'

describe('CreateTutorialsUseCase', () => {
  let createTutorialsUseCase: CreateTutorialsUseCase
  let tutorialsRepository: TutorialsRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateTutorialsUseCase, tutorialsRepositoryMock],
    }).compile()

    createTutorialsUseCase = module.get<CreateTutorialsUseCase>(
      CreateTutorialsUseCase,
    )
    tutorialsRepository = module.get<TutorialsRepository>(TutorialsRepository)
  })

  it('should be defined', () => {
    expect(createTutorialsUseCase).toBeDefined()
  })

  it('should create a tutorials', async () => {
    const title = 'title'
    tutorialsRepository.create(title)

    // jest
    //   .spyOn(tutorialsRepository, 'create')
    //   .mockImplementation(async () => tutorials)

    const response = await createTutorialsUseCase.execute({ title })

    console.log(response)

    expect(response.isRight()).toBeTruthy()
    // expect(response.value).toEqual(tutorials)
  })
})
