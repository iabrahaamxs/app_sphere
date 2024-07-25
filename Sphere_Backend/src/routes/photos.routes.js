import { Router } from "express";
import { PhotoController } from "../controllers/photos.controllers.js";

const router = Router();

router.get("/photos", PhotoController.getPhotos);

export default router;
