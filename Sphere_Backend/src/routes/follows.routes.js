import { Router } from "express";
import { FollowController } from "../controllers/follows.controllers.js";
import { verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router();

//router.get("/follows", getFollows);

router.get("/followed", verifyToken, FollowController.getFollowed);

router.get("/follows", verifyToken, FollowController.getfollowers);

router.post("/follows", FollowController.createFollower);

router.put("/follows", FollowController.deleteFollower);

export default router;
