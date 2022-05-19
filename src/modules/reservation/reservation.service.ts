import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate'
import { dateWithoutTime } from '../../utils/date-utils'
import { CountryService } from '../country/country.service'
import { Reservation } from './reservation.entity'
import { ReservationRepository } from './reservation.repository'
import {
  CheckInCheckOutDatesCantBeInPast,
  CreateReservationDto,
  InvalidCheckInOutDates,
} from './reservation.types'

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationRepository)
    private readonly repository: ReservationRepository,
    private readonly countryService: CountryService
  ) {}

  async paginate(
    checkInDate: Date,
    checkOutDate: Date,
    options: IPaginationOptions = { page: 1, limit: 0 }
  ): Promise<Pagination<Reservation>> {
    return this.repository.paginate(checkInDate, checkOutDate, options)
  }

  async create(payload: CreateReservationDto): Promise<Reservation> {
    const country = await this.countryService.findByIdOrFail(payload.countryId)
    this.validateReservationDates(payload)
    return this.repository.createAndFetch({ ...payload, country })
  }

  private validateReservationDates(payload: CreateReservationDto): void {
    const now = dateWithoutTime(new Date()).getTime()

    if (payload.checkInDate > payload.checkOutDate)
      throw new BadRequestException(InvalidCheckInOutDates)

    if (
      payload.checkInDate.getTime() < now ||
      payload.checkOutDate.getTime() < now
    )
      throw new BadRequestException(CheckInCheckOutDatesCantBeInPast)
  }
}
