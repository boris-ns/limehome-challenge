import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from './config/config'
import { ErrorExceptionsFilter } from './filters/error-exceptions.filter'
import { FixturesModule } from './fixtures/fixtures.module'
import { CountryModule } from './modules/country/country.module'
import { ReservationModule } from './modules/reservation/reservation.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
      inject: [ConfigService],
    }),
    FixturesModule,
    ReservationModule,
    CountryModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorExceptionsFilter,
    },
  ],
})
export class AppModule {}
