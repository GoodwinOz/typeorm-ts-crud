import express from 'express'
import UserRouter from './user.router'
import PostRouter from './post.router'
import auth from './auth'
import UploadRouter from './file.routes'

const router = express.Router()

router.use('/auth', auth)
router.use('/posts', PostRouter)
router.use('/users', UserRouter)
router.use('/upload', UploadRouter)

export default router