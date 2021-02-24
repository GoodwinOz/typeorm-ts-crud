import { Request, Response } from 'express'
import { validate } from 'class-validator'
import { getRepository } from 'typeorm'

import { UploadModel } from '../models/upload'

class UploadController {

static listAll = async (req: Request, res: Response) => {
    const uploadRepository = getRepository(UploadModel)
    const uploads = await uploadRepository.find({
        select: ['id', 'name', 'type']
    })
    res.send(uploads)
    }

static getOneById = async (req: Request, res: Response) => {
    const id = req.params.id

    const uploadRepository = getRepository(UploadModel)
    try { 
        const upload = await uploadRepository.findOneOrFail(id, {

            select: ['id', 'name', 'type', 'url']
        })
        res.send(upload)
    } catch(e) {
        res.status(404).send('Image not found')
    }
}

//Uploading new file (image)
static newUpload = async(req: Request, res: Response) => {

    let upload = new UploadModel()
    //req.body while uploading file is undefined
    upload.name = req.file.filename
    upload.type = req.body.type
    upload.url = req.file.destination
    
    //Saving image data
    const uploadRepository = getRepository(UploadModel)
    try {
        await uploadRepository.save(upload)
    } catch (e) {
        console.log(e)
        res.status(409).send('Something went wrong')
        return
    }
    res.status(201).send('Image uploaded')
}


//Patch upload
static editUpload = async (req: Request, res: Response) => {
    const id = req.params.id    

    const { name, type, url } = req.body

    const uploadRepository = getRepository(UploadModel)
    let upload
    try {
        upload = await uploadRepository.findOneOrFail(id)
    } catch (e) {
        res.status(404).send('Image not found')
        return        
    }

    upload.name = name
    upload.type = type
    upload.url = url

    //Validation
    const err = await validate(upload)
    if (err.length > 0) {
        res.status(400).send(err)
        return
    }
    try {
        await uploadRepository.save(upload);
    } catch (e) {
        res.status(409).send("Image name already in use");
        return;
    }
    
    res.status(204).send('Uplad data edited successfully')    
}

static deleteUpload = async (req: Request, res: Response) => {
    const id = req.params.id

    const uploadRepository = getRepository(UploadModel)
    let upload = {} as UploadModel
    try {
        upload = await uploadRepository.findOneOrFail(id)
    } catch (e) {
        res.status(404).send('Image not found')
        return
    }
    uploadRepository.delete(id)

    res.status(204).send('Image deleted successfully')
}
}

export default UploadController