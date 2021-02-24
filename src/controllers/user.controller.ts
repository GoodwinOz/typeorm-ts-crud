import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { User } from '../models'


class UserController {

static listAll = async (req: Request, res: Response) => {
    const userRepository = getRepository(User)
    const users = await userRepository.find({
        //Password excluded
        select: ['id', 'email', 'name', 'role'] 
    })
    res.send(users)
    }

static getOneById = async (req: Request, res: Response) => {
    const id = req.params.id

    const userRepository = getRepository(User)
    try { 
        const user = await userRepository.findOneOrFail(id, {
            //Password excluded
            select: ['id', 'email', 'name', 'role']
        })
        res.send(user)

        //Validation
        const err = await validate(user)
        if (err.length > 0) {
            res.status(400).send(err)
            return
        }
    } catch(e) {
        res.status(404).send('User not found')
    }
}

static newUser = async(req: Request, res: Response) => {
    let { email, name, password, role } = req.body
    let user = new User()
    user.email = email
    user.name = name
    user.password = password
    user.role = role

    const err = await validate(user)
    if(err.length > 0) {
        return res.status(400).send(err)        
    }
    
    //Hash password
    user.hashPassword()

    //Saving user data
    const userRepository = getRepository(User)
    try {
        await userRepository.save(user)
    } catch (err) {
        console.log(err) 
        return res.status(409).send('Email already exist')               
    }
    res.status(201).send('User created')
}


//Patch user
static editUser = async (req: Request, res: Response) => {
    const id = req.params.id    

    const { email, name, role } = req.body

    const userRepository = getRepository(User)
    let user
    try {
        user = await userRepository.findOneOrFail(id)
    } catch (e) {
        console.log(e)
        return res.status(404).send('User not found')               
    }

    user.email = email
    user.name = name
    user.role = role

    //Validation
    const err = await validate(user)
    if (err.length > 0) {
        res.status(400).send(err)
        return
    }
    try {
        await userRepository.save(user)
    } catch (e) {
        console.log(e)
        return res.status(409).send('Username already in use')
        
    }    
    res.status(204).send('Data has been edited')
}

static deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id

    const userRepository = getRepository(User)
    let user: User
    try {
        user = await userRepository.findOneOrFail(id)
    } catch (e) {
        res.status(404).send('User not found')
        return
    }

    //Validation
    const err = await validate(user)
    if (err.length > 0) {
        res.status(400).send(err)
        return
    }

    userRepository.delete(id)

    res.status(204).send('User has been deleted')
}
}


export default UserController