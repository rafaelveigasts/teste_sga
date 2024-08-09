import { Tutorials } from '../entities/tutorials'

export abstract class TutorialsRepository {
  abstract list(
    page: number,
    quantity: number,
    date?: Date,
    title?: string,
  ): Promise<Tutorials[] | null>
  abstract create(title: string): Promise<Tutorials>
  abstract patch(id: string, title: string): Promise<Tutorials>
  abstract findById(id: string): Promise<Tutorials | null>
  abstract deleteById(id: string): Promise<void>
}
