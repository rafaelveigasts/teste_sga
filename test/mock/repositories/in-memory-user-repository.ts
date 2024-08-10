import { User } from '@/domain/users/entities/user'
import { UserRepository } from '@/domain/users/repositories/user-repository'

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = []

  async findByUsername(name: string): Promise<User | null> {
    return this.users.find(user => user.name === name) || null
  }

  async create(name: string, password: string): Promise<User> {
    const user: User = {
      name,
      password,
    }
    this.users.push(user)

    return user
  }
}
