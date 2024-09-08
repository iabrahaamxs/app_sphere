import { Router } from "express";
import { CategorieController } from "../controllers/categories.controllers.js";
import { verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router();

router.post("/categorie", CategorieController.createUserCategorie);
router.get("/categorie", verifyToken, CategorieController.getCategories);
router.put("/categorie", CategorieController.updateCategories);

export default router;
