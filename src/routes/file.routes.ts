import express from 'express'
import { uploadFile } from '../middleware/file.upload'
import UploadController from '../controllers/upload.controller'
import { checkJwt } from '../middleware/checkJwt'


const router = express.Router()

router.get('/', /*[checkJwt],*/ UploadController.listAll)

router.get('/:id([0-9]+)', /*[checkJwt],*/ UploadController.getOneById )

router.post('/', uploadFile.single('image'), /*[checkJwt],*/ UploadController.newUpload) //Check can be added

router.patch('/:id([0-9]+)', [checkJwt], UploadController.editUpload)

router.delete('/:id([0-9]+)', [checkJwt], UploadController.deleteUpload)

export default router