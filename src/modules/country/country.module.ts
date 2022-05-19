import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CountryRepository } from './country.repository'
import { CountryService } from './country.service'

@Module({
  imports: [TypeOrmModule.forFeature([CountryRepository])],
  providers: [CountryService],
  exports: [CountryService],
})
export class CountryModule {}
