import { Router } from "express";
import { PostController } from "../../controllers/posts.controllers.js";

const router = Router();

router.get("/posts/:id", PostController.getPosts);

export default router;
