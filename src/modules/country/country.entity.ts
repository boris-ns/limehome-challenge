import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../core/base.entity'

@Entity()
export class Country extends BaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  name: string

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  code: string
}
