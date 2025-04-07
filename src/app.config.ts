import { DataSourceOptions } from "typeorm";
import 'dotenv/config'

export const databaseConfig: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DATABASE_EMOJI_HOST,
    port: +process.env.DATABASE_EMOJI_PORT,
    username: process.env.DATABASE_EMOJI_USERNAME,
    password: process.env.DATABASE_EMOJI_USERNAME,
    database: process.env.DATABASE_EMOJI_NAME,
    synchronize: true,
};