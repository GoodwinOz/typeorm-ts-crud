import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'
// import { validate } from 'class-validator'
// import * as dotenv from 'dotenv'

import { User } from '../models/user'
import config from '../config/jwt.config'

class AuthController {
    static login = async (req: Request, res: Response) => {
    //Checking email and pass
        let { email, password } = req.body
        if(!(email && password)) {
            console.log('Email or password are not valid')
            res.status(400).send()
        }

        //Get user from DB
        const userRepository = getRepository(User)
        
        // let user: User //Why err?
        let user = {} as User // ????
        try {
            user = await userRepository.findOneOrFail({ where: { email }})
        } catch (error) {
            console.log(error)
            // res.status(401).send(error)
        }

        //Checking if decrypted password is ok
        if(!user.checkIfUnencryptedPasswordIsValid(password)) {
            console.log('Encrypted password is not valid')
            res.status(401).send()
            return
        }
        
        //Sending token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            config.jwtSecret, { expiresIn: "24h"}        
        )
        res.send(token)
    }
}
export default AuthController