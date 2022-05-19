import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from '../core/base.entity'
import { Country } from '../country/country.entity'

// TODO: Restructure this class into multiple classes
// but keep the fields in the same table
// Reference: https://typeorm.io/embedded-entities#
@Entity()
export class Reservation extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'date', nullable: false })
  checkInDate: Date

  @ApiProperty()
  @Column({ type: 'date', nullable: false })
  checkOutDate: Date

  @ApiProperty()
  @Column({ type: 'integer', nullable: false })
  numberOfGuests: number

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  firstName: string

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  lastName: string

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  billingAddress: string

  @ApiProperty()
  @Column({ type: 'integer', nullable: false })
  postalCode: number

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  city: string

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  email: string

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  phoneNumber: string

  @ApiProperty({ type: () => Country })
  @ManyToOne(() => Country, { nullable: false })
  country: Country
}
