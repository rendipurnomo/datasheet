import express from "express";
import { getAllUsers, getUserById, updateUser } from "../controllers/dataController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id", updateUser);

export default router