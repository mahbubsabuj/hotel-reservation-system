import express from "express";
import { getUser, getUsers, updateUser, deleteUser } from "../controllers/user.js";

const router = express.Router();

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.get("/:id", getUser);

router.get("/", getUsers);

export default router;
