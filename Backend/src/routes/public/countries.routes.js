import { Router } from "express";
import { getCountries } from "../../controllers/countries.controllers.js";

const router = Router();

router.get("/countries", getCountries);

export default router;
