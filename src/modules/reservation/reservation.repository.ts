import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate'
import { EntityRepository, Repository } from 'typeorm'
import { Reservation } from './reservation.entity'

@EntityRepository(Reservation)
export class ReservationRepository extends Repository<Reservation> {
  async createAndFetch(payload: Partial<Reservation>): Promise<Reservation> {
    const reservation = this.create(payload)
    return this.save(reservation)
  }

  async paginate(
    checkInDate: Date,
    checkOutDate: Date,
    options: IPaginationOptions = { page: 1, limit: 0 }
  ): Promise<Pagination<Reservation>> {
    const query = this.createQueryBuilder('reservation').leftJoinAndSelect(
      'reservation.country',
      'country'
    )

    if (checkInDate)
      query.andWhere('reservation.checkInDate >= :checkInDate', { checkInDate })

    if (checkOutDate)
      query.andWhere('reservation.checkOutDate <= :checkOutDate', {
        checkOutDate,
      })

    if (!options?.limit) {
      const [items, itemCount] = await query.getManyAndCount()

      return {
        items,
        meta: {
          currentPage: 1,
          totalPages: 1,
          itemCount,
          itemsPerPage: itemCount,
          totalItems: itemCount,
        },
      }
    }

    return paginate(query, options)
  }
}
