import 'reflect-metadata'
import express, { Application } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import path from 'path'
import helmet from 'helmet'
import { createConnection } from 'typeorm'

import router from './routes'
import dbConfig from './config/database'
// import cors from 'cors' 
// import * as bodyParser from 'body-parser'
// import config from './config/database'


dotenv.config()

const app: Application = express()
const port = process.env.PORT


app.use(express.static(path.join(process.cwd(), __dirname, 'uploads')));

app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('public'))
app.use(helmet())

app.use(router)

createConnection(dbConfig).then((_connection) => {
    console.log(_connection)
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}).catch((err) => {
    console.log('Connection to DB failed', err)
    process.exit(1)
})




