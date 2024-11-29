import { Router } from "express";
import { UserController } from "../../controllers/users.controllers.js";

const router = Router();

router.get("/profile/:userid", UserController.profileUser);
router.post("/register/validate", UserController.validateUser);
router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);
router.post("/forgot-password", UserController.forgotPassword);

export default router;
