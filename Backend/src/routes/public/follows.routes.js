import { Router } from "express";
import { FollowController } from "../../controllers/follows.controllers.js";

const router = Router();

router.get("/followed/count/:id", FollowController.countFollowed);
router.get("/followers/count/:id", FollowController.countFollowers);

export default router;
