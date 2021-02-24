import express from 'express'
import PostController from '../controllers/post.controller'
import { checkJwt } from '../middleware/checkJwt'

const router = express.Router()

router.get('/', /*[checkJwt],*/ PostController.listAll)

router.get('/:id', /*[checkJwt],*/ PostController.getOneById )

router.post('/', /*[checkJwt],*/ PostController.newPost)

router.patch('/:id', [checkJwt], PostController.editPost)

router.delete('/:id', [checkJwt], PostController.deletePost)

export default router