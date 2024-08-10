import { Test, TestingModule } from '@nestjs/testing'
import { AuthenticateUserUseCase } from './authenticate-user'
import { JwtService } from '@nestjs/jwt'
import { InMemoryUserRepository } from '../../../../test/mock/repositories/in-memory-user-repository'
import { UserRepository } from '../../users/repositories/user-repository'
import { faker } from '@faker-js/faker'

let sut: AuthenticateUserUseCase
let jwtService: JwtService
let inMemoryUserRepository: InMemoryUserRepository

describe('[Auth] AuthenticateUseCase', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticateUserUseCase,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: UserRepository,
          useClass: InMemoryUserRepository,
        },
      ],
    }).compile()

    sut = module.get<AuthenticateUserUseCase>(AuthenticateUserUseCase)
    jwtService = module.get<JwtService>(JwtService)
    inMemoryUserRepository = module.get<InMemoryUserRepository>(UserRepository)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
    expect(jwtService).toBeDefined()
  })

  it('should be able to authenticate a user', async () => {
    const userData = {
      name: faker.person.firstName(),
      password: faker.internet.password(),
    }

    const response = await sut.execute(userData)

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toBeInstanceOf(Object)
    expect(inMemoryUserRepository.users[0].name).toBe(userData.name)
  })
})
