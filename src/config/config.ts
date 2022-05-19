/* eslint-disable @typescript-eslint/camelcase */
import * as dotenv from 'dotenv'
import { join } from 'path'

dotenv.config()

export const defaultConfig = {
  app: {
    name: process.env.PROJECT_NAME,
    port: parseInt(process.env.PORT, 10),
  },
  typeorm: {
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    entities: [
      join(__dirname, '../../..', process.env.TYPEORM_ENTITIES),
      join(__dirname, '../modules/**/*.entity.ts'),
    ],
    migrations: [join(__dirname, '../..', process.env.TYPEORM_MIGRATIONS)],
    logging: ['error'],
    cli: {
      migrationsDir: join(__dirname, '../..', process.env.TYPEORM_MIGRATIONS),
    },
  },
}

export const config = () => {
  return defaultConfig
}
