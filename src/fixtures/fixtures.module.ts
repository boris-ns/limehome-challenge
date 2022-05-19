import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { FixturesService } from './fixtures.service'
import { CountryFixturesService } from './services/country-fixtures.service'

@Module({
  imports: [ConfigModule],
  providers: [FixturesService, CountryFixturesService],
})
export class FixturesModule {}
