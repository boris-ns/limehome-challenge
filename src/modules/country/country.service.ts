import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Country } from './country.entity'
import { CountryRepository } from './country.repository'

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryRepository)
    private readonly repository: CountryRepository
  ) {}

  async findByIdOrFail(id: string): Promise<Country> {
    return this.repository.findByIdOrFail(id)
  }
}
