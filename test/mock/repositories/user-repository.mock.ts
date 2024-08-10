import { UserRepository } from '../../../src/domain/users/repositories/user-repository'

export const userRepositoryMock = {
  provide: UserRepository,
  useValue: {
    create: jest.fn().mockResolvedValue({
      id: 'any_id',
      name: 'any_name',
      password: 'any_password',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    findByUsername: jest.fn(),
  },
}
