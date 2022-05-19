import { ApiProperty } from '@nestjs/swagger'
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsUUID,
} from 'class-validator'

export const InvalidCheckInOutDates = 'check-in-and-out-dates-not-valid'
export const CheckInCheckOutDatesCantBeInPast =
  'check-in-and-out-dates-cant-be-in-past'

export class PaginationQueryArgs {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  checkInDate?: Date

  @ApiProperty({ required: false })
  @IsOptional()
  checkOutDate?: Date

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  page: number = 1

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  limit: number = 0
}

export class CreateReservationDto {
  @ApiProperty({ required: true })
  @IsDate()
  @IsNotEmpty()
  checkInDate: Date

  @ApiProperty({ required: true })
  @IsDate()
  checkOutDate: Date

  @ApiProperty({ required: true })
  @IsNumber()
  numberOfGuests: number

  @ApiProperty({ required: true })
  @IsNotEmpty()
  firstName: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  lastName: string

  @ApiProperty({ required: true })
  @IsNotEmpty()
  billingAddress: string

  @ApiProperty({ required: true })
  @IsNumber()
  postalCode: number

  @ApiProperty({ required: true })
  @IsNotEmpty()
  city: string

  @ApiProperty({ required: true })
  @IsEmail()
  email: string

  @ApiProperty({ required: true })
  @IsPhoneNumber()
  phoneNumber: string

  @ApiProperty({ required: true })
  @IsUUID()
  countryId: string
}
