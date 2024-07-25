import { Router } from "express";
import { createUserCategorie, getCategories } from "../controllers/categories.controllers.js"

const router = Router()

router.post('/categorie', createUserCategorie)
router.get('/categorie/:id', getCategories)


export default router;