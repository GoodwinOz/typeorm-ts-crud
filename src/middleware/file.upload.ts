import { Request } from 'express'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        cb(null, __dirname + '../../uploads')
    },

    filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

const fileFilter = (req: any, file: any, cb: any) => {
    if(file.mimetype === 'image/jpg' ||
       file.mimetype === 'image/jpeg'||
       file.mimetype === 'image/png') {
           cb(null, true)
       } else {
           cb(new Error('Uploaded image is not jpg/jpeg/png format.'), false)
       }
}

export const uploadFile = multer({ storage: storage, fileFilter: fileFilter })