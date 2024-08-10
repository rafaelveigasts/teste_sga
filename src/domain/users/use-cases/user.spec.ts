import { TestingModule, Test } from '@nestjs/testing'

import { CreateUserUseCase } from './create-user'
import { UserRepository } from '../repositories/user-repository'
import { User } from '../entities/user'
import { faker } from '@faker-js/faker'
import { userRepositoryMock } from '../../../../test/mock/repositories/user-repository.mock'

describe('[USER USE CASE - UNIT TEST]', () => {
  let createUserUseCase: CreateUserUseCase
  let userRepository: UserRepository

  describe('CreateUserUseCase', () => {
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [CreateUserUseCase, userRepositoryMock],
      }).compile()

      createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase)
      userRepository = module.get<UserRepository>(UserRepository)
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should be defined', () => {
      expect(createUserUseCase).toBeDefined()
    })

    it('should be able to create a new user', async () => {
      const user: User = {
        name: faker.internet.userName(),
        password: faker.internet.password(),
      }

      jest.spyOn(userRepository, 'create').mockImplementation(async () => user)

      const response = await createUserUseCase.execute({
        name: user.name,
        password: user.password,
      })

      expect(response.isRight()).toBeTruthy()
      expect(response.value).toEqual(response.value)
    })
  })
})
