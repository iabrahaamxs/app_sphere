import { Router } from "express";
import { createPost, getPosts } from "../controllers/posts.controllers.js";
import { verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router();

router.post("/posts", createPost);
router.get("/posts", verifyToken, getPosts);

export default router;
