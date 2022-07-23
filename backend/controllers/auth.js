import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
    const { userName, email, password, isAdmin } = req.body;
    let user = new User({
        userName,
        email,
        passwordHash: bcryptjs.hashSync(password, +process.env.SALT),
        isAdmin,
    });
    user = await user.save();
    if (!user) {
        return next(createError(500, "User cannot be created."));
    }
    return res.status(201).json(user);
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return next(createError(404, "User not found."));
    }
    console.log(password, user.passwordHash)
    if (!bcryptjs.compareSync(password, user.passwordHash)) {
        return next(createError(401, "Email or password is incorrect."));
    }
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_TOKEN, { expiresIn: "24h" })
    return res.status(200).json({ message: "Successfully Logged in.", token: token });
};
