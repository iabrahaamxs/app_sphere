import { Router } from "express";
import { CategorieController } from "../../controllers/categories.controllers.js";

const router = Router();

router.get("/categories", CategorieController.getMyCategories);
router.post("/categories", CategorieController.createUserCategorie);
router.put("/categories", CategorieController.updateCategories);

export default router;
