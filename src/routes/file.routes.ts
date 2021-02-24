import multer from 'multer'
import express, { NextFunction, Request, Response } from 'express'

import { uploadFile } from '../middleware/file.upload'
import UploadController from '../controllers/upload.controller'
import { checkJwt } from '../middleware/checkJwt'


const router = express.Router()

//Добавить валидацию строковых данных в поле ID

router.get('/', /*[checkJwt],*/ UploadController.listAll)

router.get('/:id([0-9]+)', /*[checkJwt],*/ UploadController.getOneById )

router.post('/', uploadFile.single('image'), /*[checkJwt],*/ UploadController.newUpload) //Check can be added

router.patch('/:id([0-9]+)', [checkJwt], UploadController.editUpload)

router.delete('/:id([0-9]+)', [checkJwt], UploadController.deleteUpload)


// router.post('/', uploadFile.array('images', 5), async(req: Request, res: Response, next: NextFunction) => {
//     // let {name, type, url} = req.body
//     let newUpload = new UploadModel({
//         name: req.file.originalname,
//         type: req.body.type,
//         url: req.file.destination    
//     })
// })

export default router