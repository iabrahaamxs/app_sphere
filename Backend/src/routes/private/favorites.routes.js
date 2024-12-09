import { Router } from "express";
import { FavoriteController } from "../../controllers/favorites.controllers.js";

const router = Router();

router.get("/favorites", FavoriteController.getFavorites);
router.post("/addfavorite", FavoriteController.addFavorite);
router.put("/deletefavorite", FavoriteController.deleteFavorite);
router.get("/isfavorited", FavoriteController.isFavorite);

export default router;
