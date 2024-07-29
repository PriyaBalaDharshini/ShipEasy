import express from "express"
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/allUsers", userController.getAllUsers)

router.post("/register", userController.registerUser)
router.post("/login", userController.login)

router.delete("/delete/:id", userController.deleteUser)



export default router