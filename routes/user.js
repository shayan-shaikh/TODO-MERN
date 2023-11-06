import express from "express";
import { createUser, getAllUsers, getMyUser, login, logout } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
router.get("/all", getAllUsers)

router.get("/me", isAuthenticated, getMyUser)

router.post("/create", createUser)
router.post("/login", login)
router.get("/logout", logout)
export default router;