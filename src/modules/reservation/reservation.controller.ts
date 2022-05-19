import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Pagination } from 'nestjs-typeorm-paginate'
import { Reservation } from './reservation.entity'
import { ReservationService } from './reservation.service'
import {
  ApiCreateReservation,
  ApiFindAllReservations,
} from './reservation.swagger'
import { CreateReservationDto, PaginationQueryArgs } from './reservation.types'

@ApiTags('reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiFindAllReservations()
  @Get()
  async findAll(
    @Query(new ValidationPipe())
    query: PaginationQueryArgs
  ): Promise<Pagination<Reservation>> {
    return this.reservationService.paginate(
      query.checkInDate,
      query.checkOutDate,
      {
        page: query.page,
        limit: query.limit,
      }
    )
  }

  @ApiCreateReservation()
  @Post()
  async create(@Body() payload: CreateReservationDto): Promise<Reservation> {
    return this.reservationService.create(payload)
  }
}
