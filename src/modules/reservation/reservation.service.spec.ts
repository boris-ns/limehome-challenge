import { BadRequestException, NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'
import { Country } from '../country/country.entity'
import { CountryService } from '../country/country.service'
import { CountryNotFoundError } from '../country/country.types'
import { Reservation } from './reservation.entity'
import { ReservationRepository } from './reservation.repository'
import { ReservationService } from './reservation.service'
import {
  CheckInCheckOutDatesCantBeInPast,
  CreateReservationDto,
  InvalidCheckInOutDates,
} from './reservation.types'

// TODO: Extract mocked data into separate files

const country = new Country()
country.name = 'Serbia'

describe('ReservationService', () => {
  let reservationService: ReservationService
  let reservationRepository: ReservationRepository
  let countryService: CountryService
  let tomorrow: Date
  let now: Date
  const reservationRepositoryToken = getRepositoryToken(ReservationRepository)

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: CountryService,
          useValue: {
            findByIdOrFail: jest.fn(),
          },
        },
        {
          provide: reservationRepositoryToken,
          useValue: {
            paginate: jest.fn(),
            createAndFetch: jest.fn(),
          },
        },
      ],
    }).compile()

    now = new Date()
    tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    reservationService = moduleRef.get<ReservationService>(ReservationService)
    countryService = moduleRef.get<CountryService>(CountryService)
    reservationRepository = moduleRef.get<ReservationRepository>(
      ReservationRepository
    )
  })

  describe('Create reservation', () => {
    let createPayload: CreateReservationDto
    beforeEach(() => {
      createPayload = {
        billingAddress: 'Address',
        city: 'Novi Sad',
        countryId: '',
        email: 'test@email.com',
        firstName: 'John',
        lastName: 'Smith',
        numberOfGuests: 1,
        phoneNumber: '+38111111',
        postalCode: 21000,
        checkInDate: tomorrow,
        checkOutDate: tomorrow,
      }
    })

    test('should create new reservation', async () => {
      jest.spyOn(countryService, 'findByIdOrFail').mockResolvedValue(country)
      jest.spyOn(reservationRepository, 'createAndFetch').mockResolvedValue({
        ...createPayload,
        country,
        createdAt: now,
        updatedAt: now,
        deletedAt: now,
        id: '1',
      })

      const result = await reservationService.create(createPayload)
      expect(result).toHaveProperty('country')
      expect(result).toMatchObject(createPayload)
    })

    test('should throw an error if country does not exist', async () => {
      const error = new NotFoundException(CountryNotFoundError)

      jest.spyOn(countryService, 'findByIdOrFail').mockRejectedValue(error)

      const fn = async () => reservationService.create(createPayload)
      expect(fn).rejects.toEqual(error)
    })

    test('should throw an error if checkInDate is after checkOutDate', async () => {
      createPayload.checkInDate = new Date(2022, 10, 30)
      createPayload.checkOutDate = new Date(2022, 10, 25)

      const fn = async () => reservationService.create(createPayload)
      expect(fn).rejects.toEqual(
        new BadRequestException(InvalidCheckInOutDates)
      )
    })

    test('should throw an error if checkInDate is less than today', async () => {
      createPayload.checkInDate = new Date(2020, 10, 30)
      createPayload.checkOutDate = new Date(2020, 10, 31)

      const fn = async () => reservationService.create(createPayload)
      expect(fn).rejects.toEqual(
        new BadRequestException(CheckInCheckOutDatesCantBeInPast)
      )
    })

    test('should throw an error if checkOutDate is less than today', async () => {
      createPayload.checkInDate = new Date(2020, 10, 30)
      createPayload.checkOutDate = new Date(2020, 10, 31)

      const fn = async () => reservationService.create(createPayload)
      expect(fn).rejects.toEqual(
        new BadRequestException(CheckInCheckOutDatesCantBeInPast)
      )
    })
  })

  describe('paginate', () => {
    const paginationOptions: IPaginationOptions = {
      limit: 10,
      page: 1,
    }

    // TODO: Create, use and test with more mocked items
    test('should return paginated reservations', async () => {
      jest.spyOn(reservationRepository, 'paginate').mockResolvedValue({
        items: [new Reservation(), new Reservation()],
        meta: {
          currentPage: 1,
          itemCount: 2,
          itemsPerPage: 10,
          totalItems: 2,
          totalPages: 1,
        },
      })

      const result = await reservationService.paginate(
        tomorrow,
        tomorrow,
        paginationOptions
      )
      expect(result.items.length).toEqual(2)
    })
  })
})
