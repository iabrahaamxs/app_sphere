import { Router } from "express";
import { UserController } from "../controllers/users.controllers.js";
import { verifyToken } from "../middlewares/jwt.middlewares.js";

const router = Router();

router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);
router.get("/profile", verifyToken, UserController.profileUser);
router.put("/information", UserController.updateInfoUser);
router.put("/setting", UserController.updateSettingUser);
router.put("/password", UserController.updatePasswordUser)


export default router;


