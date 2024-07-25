import { Router } from "express";
import {
  createFollower,
  deleteFollower,
  FollowController,
  getfollowers,
} from "../controllers/follows.controllers.js";

const router = Router();

//router.get("/follows", getFollows);

router.get("/followed/:id", FollowController.getFollowed);

router.get("/follows/:id", getfollowers);

router.post("/follows", createFollower);

router.put("/follows", deleteFollower);

export default router;
