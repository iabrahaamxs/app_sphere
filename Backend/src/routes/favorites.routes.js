import { Router } from "express";
import { FavoriteController } from "../controllers/favorites.controllers.js";
import { verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router();

router.get("/favorites", verifyToken, FavoriteController.getFavorites);

export default router;
