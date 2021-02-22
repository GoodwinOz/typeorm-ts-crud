import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import config from '../config/jwt.config'

dotenv.config()

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //Get JwtToken from headers
    const token = <string>req.headers["auth"]
    let jwtPayload

    //Validating token data
    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret)
        res.locals.jwtPayload = jwtPayload
    } catch (err) {
        res.status(401).send()
        return
    }

    const { userId, email } = jwtPayload
    const newToken = jwt.sign({ userId, email }, config.jwtSecret, {
        expiresIn: "24h"
    })
    res.setHeader('token', newToken)

    next()
}