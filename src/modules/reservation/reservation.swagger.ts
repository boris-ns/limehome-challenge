import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger'
import { ErrorResponse } from '../../utils/types'
import { CountryNotFoundError } from '../country/country.types'
import { Reservation } from './reservation.entity'
import { InvalidCheckInOutDates } from './reservation.types'

export function ApiFindAllReservations() {
  return applyDecorators(
    ApiOperation({ summary: 'Search and get reservations with pagination' }),
    ApiOkResponse({
      description: 'List of reservations',
      schema: {
        properties: {
          data: {
            type: 'array',
            items: { $ref: getSchemaPath(Reservation) },
          },
          meta: {
            type: 'object',
            properties: {
              totalItems: { type: 'number' },
              itemCount: { type: 'number' },
              itemsPerPage: { type: 'number' },
              totalPages: { type: 'number' },
              currentPage: { type: 'number' },
            },
          },
        },
      },
    })
  )
}

export function ApiCreateReservation() {
  return applyDecorators(
    ApiOperation({ summary: 'Create reservation' }),
    ApiCreatedResponse({
      description: 'Created reservation',
      type: Reservation,
    }),
    ApiBadRequestResponse({
      description: `Check-in and check-out dates are not valid (${InvalidCheckInOutDates})`,
      type: ErrorResponse,
    }),
    ApiNotFoundResponse({
      description: `Country not found (${CountryNotFoundError})`,
      type: ErrorResponse,
    })
  )
}
