import express from 'express'
// import PingController from '../controllers/ping.controller'
import UserRouter from './user.router'
import PostRouter from './post.router'
import auth from './auth'

const router = express.Router()

// router.get('/ping', async (_req, res) => {
//     const controller = new PingController()
//     const response = await controller.getMessage()
//     return res.send(response)
// })

router.use('/auth', auth)
router.use('/posts', PostRouter)
router.use('/users', UserRouter)

export default router