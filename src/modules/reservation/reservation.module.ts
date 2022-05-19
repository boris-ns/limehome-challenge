import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CountryModule } from '../country/country.module'
import { ReservationController } from './reservation.controller'
import { ReservationRepository } from './reservation.repository'
import { ReservationService } from './reservation.service'

@Module({
  imports: [TypeOrmModule.forFeature([ReservationRepository]), CountryModule],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
