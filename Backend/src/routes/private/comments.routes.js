import { Router } from "express";
import { CommentController } from "../../controllers/comments.controllers.js";

const router = Router();

router.get("/comments", CommentController.getComments);
router.get("/count", CommentController.countComments);
router.post("/create", CommentController.createComment);

export default router;
