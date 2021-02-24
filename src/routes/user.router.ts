import express from 'express'
import UserContorller from '../controllers/user.controller'
import { checkJwt } from '../middleware/checkJwt'

const router = express.Router()

router.get('/', [checkJwt], UserContorller.listAll)

router.get('/:id', [checkJwt], UserContorller.getOneById )

router.post('/', [checkJwt], UserContorller.newUser)

router.patch('/:id', [checkJwt], UserContorller.editUser)

router.delete('/:id', [checkJwt], UserContorller.deleteUser)

// router.get('/', async (_req, res) => {
//     const controller = new UserContorller()
//     const response = await controller.getUsers()
//     return res.send(response)
// })

// router.post('/', async (req, res) => {
//     const controller = new UserContorller()
//     const response = await controller.createUser(req.body)
//     return res.send(response)
// })

// router.get('/:id', async (req, res) => {
//     const controller = new UserContorller()
//     const response = await controller.getUser(req.params.id)
//     if(!response) res.status(404).send({ message: 'User with such id wasn't found' })
//     return res.send(response)
// })

export default router