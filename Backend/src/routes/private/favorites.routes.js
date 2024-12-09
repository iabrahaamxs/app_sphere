import { Router } from "express";
import { FavoriteController } from "../../controllers/favorites.controllers.js";

const router = Router();

router.get("/favorites", FavoriteController.getFavorites);
router.post("/addfavorite", FavoriteController.addFavorite);

export default router;
