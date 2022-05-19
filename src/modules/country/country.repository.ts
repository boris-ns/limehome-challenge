import { NotFoundException } from '@nestjs/common'
import { EntityRepository, Repository } from 'typeorm'
import { Country } from './country.entity'
import { CountryNotFoundError } from './country.types'

@EntityRepository(Country)
export class CountryRepository extends Repository<Country> {
  async findByIdOrFail(id: string): Promise<Country> {
    const found = await this.findOne(id)
    if (!found) throw new NotFoundException(CountryNotFoundError)
    return found
  }
}
