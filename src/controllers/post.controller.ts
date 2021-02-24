import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'
import { Post } from '../models/post'


class PostController {

static listAll = async (req: Request, res: Response) => {
    const postRepository = getRepository(Post)
    const posts = await postRepository.find({
        //Password excluded
        select: ['title', 'content', 'userId'] 
    })
    res.send(posts)
    }

static getOneById = async (req: Request, res: Response) => {
    const id = req.params.id

    const postRepository = getRepository(Post)
    try { 
        const post = await postRepository.findOneOrFail(id, {
            //Password excluded
            select: ['title', 'content', 'userId']
        })
        res.send(post)

        //Validation
        const err = await validate(post)
        if (err.length > 0) {
            res.status(400).send(err)
            return
        }
    } catch(e) {
        res.status(404).send('User not found')
    }
}

static newPost = async(req: Request, res: Response) => {
    let { title, content, userId } = req.body
    let post = new Post()
    post.title = title
    post.content = content

    //Validation
    const err = await validate(post)
    if(err.length > 0) {
        return res.status(400).send(err)        
    }

    //Saving post data
    const postRepository = getRepository(Post)
    try {
        await postRepository.save(post)
    } catch (err) {
        console.log(err) 
        return res.status(409).send('Something went wrong')               
    }
    res.status(201).send('Post created successfuly')
}


//Patch post
static editPost = async (req: Request, res: Response) => {
    const id = req.params.id    

    const { title, content } = req.body

    const postRepository = getRepository(Post)
    let post
    try {
        post = await postRepository.findOneOrFail(id)
    } catch (e) {
        console.log(e)
        return res.status(404).send('Post not found')               
    }

    post.title = title
    post.content = content

    //Validation
    const err = await validate(post)
    if (err.length > 0) {
        res.status(400).send(err)
        return
    }
    try {
        await postRepository.save(post)
    } catch (e) {
        console.log(e)
        return res.status(409).send('Username already in use')
        
    }    
    res.status(204).send('Data has been edited')
}

static deletePost = async (req: Request, res: Response) => {
    const id = req.params.id

    const postRepository = getRepository(Post)
    let post: Post
    try {
        post = await postRepository.findOneOrFail(id)
    } catch (e) {
        res.status(404).send('Post wasn\'t found')
        return
    }

    //Validation
    const err = await validate(post)
    if (err.length > 0) {
        res.status(400).send(err)
        return
    }

    postRepository.delete(id)

    res.status(204).send('Post has been deleted')
}
}


export default PostController