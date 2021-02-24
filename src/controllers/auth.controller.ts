import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'

import { User } from '../models/user'
import config from '../config/jwt.config'

class AuthController {
    static login = async (req: Request, res: Response) => {
    //Checking email and pass
        let { email, password } = req.body
        if(!(email && password)) {
            res.status(400).send('Email or password are not valid')
        }

        //Get user from DB
        const userRepository = getRepository(User)
        
        let user: User
        try {
            user = await userRepository.findOneOrFail({ where: { email }})        

            //Checking if decrypted password is ok
            if(!user.checkIfUnencryptedPasswordIsValid(password)) {
                return res.status(401).send('Ecrypted password is not valid') //Добавить msg ошибки
            }
            
            //Sending token
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                config.jwtSecret, { expiresIn: "24h"}        
            )
            res.send(token)
            
        } catch (error) {
            console.log(error)
        }
    }
}
export default AuthController