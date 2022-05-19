import { NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Country } from './country.entity'
import { CountryRepository } from './country.repository'
import { CountryService } from './country.service'
import { CountryNotFoundError } from './country.types'

describe('CountryService', () => {
  let countryRepository: CountryRepository
  let countryService: CountryService
  const countryRepositoryToken = getRepositoryToken(CountryRepository)

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CountryService,
        {
          provide: countryRepositoryToken,
          useValue: {
            findByIdOrFail: jest.fn(),
          },
        },
      ],
    }).compile()

    countryService = moduleRef.get<CountryService>(CountryService)
    countryRepository = moduleRef.get<CountryRepository>(countryRepositoryToken)
  })

  describe('findByIdOrFail', () => {
    test('should return country with given ID', async () => {
      const country = new Country()
      country.name = 'Serbia'

      jest.spyOn(countryRepository, 'findByIdOrFail').mockResolvedValue(country)

      expect(await countryService.findByIdOrFail('id')).toBe(country)
    })

    test('should throw an error if country with given id doesnt exist', async () => {
      const error = new NotFoundException(CountryNotFoundError)
      jest.spyOn(countryRepository, 'findByIdOrFail').mockRejectedValue(error)
      const fn = async () => countryService.findByIdOrFail('id')
      expect(fn).rejects.toEqual(error)
    })
  })
})
