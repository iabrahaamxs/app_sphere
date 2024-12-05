import { Router } from "express";
import { LikeController } from "../../controllers/likes.controllers.js";

const router = Router();

router.get("/likes", LikeController.getLikes);
router.get("/likes/count", LikeController.countLikes);
router.post("/create", LikeController.createLike);
router.put("/delete", LikeController.deleteLike);

export default router;
