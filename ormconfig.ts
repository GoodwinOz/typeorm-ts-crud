import { join } from 'path'
// const join = require('path')
import { ConnectionOptions } from 'typeorm'
// const ConnectionOptions = require('typeorm')


const config = {
  host: 'localhost',
  user: 'main',
  password: 'qwerty123',
  database: 'users',
}

const connectionOptions: ConnectionOptions = {
    type: 'mysql',
    host: config.host,
    port: 3306,
    username: config.user || 'main',
    password: config.password,
    database: config.database,
    // entities: [
    //   Country,
    //   Province
    // ],
    // We are using migrations, synchronize should be set to false.
    synchronize: false,
    dropSchema: false,
    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.

    migrationsRun: true,
    // logging: ['warn', 'error'],
    // logger: process.env.NODE_ENV === process.env.PROD_ENV ? 'file' : 'debug',
    migrations: [
      join(__dirname, './src/migrations/*{.ts,.js}')
    ],
    cli: {
      migrationsDir: 'src/migrations'
    }
  }
  
export = connectionOptions