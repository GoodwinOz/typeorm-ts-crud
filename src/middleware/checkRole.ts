import { Request, Response, NextFunction } from 'express'
import { getRepository } from 'typeorm'

import { User } from '../models/user'

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //Get userId from auth middleware
        const id = res.locals.jwtPayload.userId

        //Get role from DB
        const userRepository = getRepository(User)
        let user: User //????
        try {
            user = await userRepository.findOneOrFail(id)
        } catch (err) {
            return res.status(401).send(err)
        }

        if(roles.indexOf(user.role) > 1) next()
        else res.status(401).send()
    }
}