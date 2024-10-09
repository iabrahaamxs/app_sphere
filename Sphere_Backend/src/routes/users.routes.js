import { Router } from "express";
import { UserController } from "../controllers/users.controllers.js";

const router = Router();

router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);
router.post("/register/validate", UserController.validateUser);
router.get("/profile/:userid", UserController.profileUser);
router.get("/search/users", UserController.getUsers);
router.put("/information", UserController.updateInfoUser);
router.put("/setting", UserController.updateSettingUser);
router.put("/password", UserController.updatePasswordUser);
router.post("/forgot-password", UserController.forgotPassword);

export default router;
