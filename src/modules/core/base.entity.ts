import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export class BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @Exclude()
  @DeleteDateColumn()
  deletedAt?: Date
}
