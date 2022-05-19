import { ApiProperty } from '@nestjs/swagger'

export class ErrorResponse {
  @ApiProperty()
  message: string

  @ApiProperty()
  statusCode: number

  @ApiProperty()
  timestamp: string

  @ApiProperty()
  path: string
}
