import { Inject, Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { CountryFixturesService } from './services/country-fixtures.service'

@Injectable()
export class FixturesService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @Inject(CountryFixturesService)
    public readonly country: CountryFixturesService
  ) {}

  async resetDatabase() {
    console.log('Sync database...')
    const qr = this.connection.createQueryRunner()
    await qr.clearDatabase()
    await this.connection.synchronize()
  }
}
