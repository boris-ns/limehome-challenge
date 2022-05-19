import { defaultConfig } from './config'

export type Config = typeof defaultConfig
export type AppConfig = typeof defaultConfig.app
export type DatabaseConfig = typeof defaultConfig.typeorm
