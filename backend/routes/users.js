import express from "express";
import { getUser, getUsers, updateUser, deleteUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauth", verifyToken, (req, res, next) => {
//     return res.send("You are authenticated.")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     return res.send("You are logged in and you can delete this account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     return res.send("You are admin, and you can do anything");
// })

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.get("/:id", verifyUser, getUser);

router.get("/", verifyAdmin, getUsers);

export default router;
