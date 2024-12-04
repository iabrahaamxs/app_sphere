import { Router } from "express";
import { FollowController } from "../../controllers/follows.controllers.js";

const router = Router();

router.get("/followed", FollowController.getFollowed);
router.get("/follows", FollowController.getfollowers);
router.get("/followed/count", FollowController.countMyFollowed);
router.get("/followers/count", FollowController.countMyFollowers);
router.get("/isfollow", FollowController.isFollowed);

router.post("/follows", FollowController.createFollower);
router.put("/follows", FollowController.deleteFollower);

export default router;
