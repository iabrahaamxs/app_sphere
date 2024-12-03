import { Router } from "express";
import { UserController } from "../../controllers/users.controllers.js";

const router = Router();

router.get("/whoami", UserController.whoami);
router.get("/search/users", UserController.getUsers);
router.put("/information", UserController.updateInfoUser);
router.put("/setting", UserController.updateSettingUser);
router.put("/password", UserController.updatePasswordUser);
router.put("/restore-password", UserController.restorePassword);

export default router;
