import { Router } from "express";
import { FollowController } from "../controllers/follows.controllers.js";

const router = Router();

//router.get("/follows", getFollows);

router.get("/followed/:id", FollowController.getFollowed);

router.get("/follows/:id", FollowController.getfollowers);

router.post("/follows", FollowController.createFollower);

router.put("/follows", FollowController.deleteFollower);

export default router;
