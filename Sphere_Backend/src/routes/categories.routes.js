import { Router } from "express";
import { CategorieController } from "../controllers/categories.controllers.js";

const router = Router();

router.post("/categorie", CategorieController.createUserCategorie);
router.get("/categorie/:id", CategorieController.getCategories);
router.put("/categorie", CategorieController.updateCategories);

export default router;
