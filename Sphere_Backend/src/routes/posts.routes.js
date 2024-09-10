import { Router } from "express";
import { PostController } from "../controllers/posts.controllers.js";
import { verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router();

router.post("/posts", PostController.createPost);
router.get("/posts/:id", PostController.getPosts);
router.get("/followersposts", verifyToken, PostController.getFollowersPosts);

export default router;
