import { Router } from "express";
import { createFollower, deleteFollower, getfollowed, getfollowers } from "../controllers/follows.controllers.js";

const router = Router();

//router.get("/follows", getFollows);

router.get('/followed/:id', getfollowed )

router.get('/follows/:id', getfollowers )

router.post('/follows', createFollower)

router.put('/follows', deleteFollower)

export default router;
