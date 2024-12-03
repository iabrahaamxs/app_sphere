import { Router } from "express";
import { PostController } from "../controllers/posts.controllers.js";
import { verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router();

router.post("/posts", PostController.createPost);
router.get("/posts/:id", PostController.getPosts);
router.get("/followersposts", verifyToken, PostController.getFollowersPosts);
router.get("/search/hashtag/:tag", PostController.searchTagPosts);
router.get("/search/hashtag/posts/:tag", PostController.searchPostsByTag);
router.get("/search/posts/:txt", PostController.searchPostsByDescription);

export default router;
