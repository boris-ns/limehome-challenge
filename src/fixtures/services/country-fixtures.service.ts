import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { readFileSync } from 'fs'
import { Country } from '../../modules/country/country.entity'
import { Connection, Repository } from 'typeorm'

@Injectable()
export class CountryFixturesService {
  private readonly repository: Repository<Country>

  constructor(
    @InjectConnection()
    private readonly connection: Connection
  ) {
    this.repository = this.connection.getRepository(Country)
  }

  async injectCountries(): Promise<Country[]> {
    console.log('seeding countries...')

    const countriesJson = JSON.parse(
      readFileSync('src/fixtures/data/countries.json', 'utf8')
    )

    const countries = countriesJson.map((country) =>
      this.repository.create({ ...country })
    )
    return this.repository.save(countries)
  }
}
