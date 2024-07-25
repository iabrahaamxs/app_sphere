import { Router } from "express";
import { createPost, getPosts } from "../controllers/posts.controllers.js"

const router = Router()


router.post('/posts', createPost)
router.get('/posts/:user', getPosts)


export default router;