import { User } from '../entities/user'

export abstract class UserRepository {
  abstract findByUsername(name: string): Promise<User | null>
  abstract create(name: string, password: string): Promise<User>
}
