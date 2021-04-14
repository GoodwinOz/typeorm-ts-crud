import express from 'express'
import UserContorller from '../controllers/user.controller'
import { checkJwt } from '../middleware/checkJwt'

const router = express.Router()

router.get('/', [checkJwt], UserContorller.listAll)

router.get('/:id', [checkJwt], UserContorller.getOneById )

router.post('/', [checkJwt], UserContorller.newUser)

router.patch('/:id', [checkJwt], UserContorller.editUser)

router.delete('/:id', [checkJwt], UserContorller.deleteUser)

export default router