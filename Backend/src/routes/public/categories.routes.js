import { Router } from "express";
import { CategorieController } from "../../controllers/categories.controllers.js";

const router = Router();

router.get("/categories/:userid", CategorieController.getCategories);

export default router;
