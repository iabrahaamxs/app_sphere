import { Router } from "express";
import { PostController } from "../../controllers/posts.controllers.js";

const router = Router();

router.get("/my-posts", PostController.getMyPosts);
router.post("/posts", PostController.createPost);
router.get("/followersposts", PostController.getFollowersPosts);
router.get("/search/hashtag/:tag", PostController.searchTagPosts);
router.get("/search/hashtag/posts/:tag", PostController.searchPostsByTag);
router.get("/search/posts/:txt", PostController.searchPostsByDescription);
router.put("/delete/:id", PostController.deletePost);
router.put("/update/:id", PostController.updatePost);


export default router;
