import mongoose from "mongoose";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
        return next(createError(403, "Invalid User ID."));
    }
    const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
    );
    if (!updatedUser) {
        return next(createError(500, "User cannot be updated."));
    }
    return res.status(200).json(updatedUser);
}

export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
        return next(createError(403, "Invalid User ID."));
    }
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
        return next(createError(500, "User cannot be deleted."));
    }
    return res
        .status(200)
        .json({ success: true, message: "User has been deleted." });
};

export const getUser = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
        return next(createError(403, "Invalid User ID."));
    }
    const user = await User.findById(id);
    if (!user) {
        return next(createError(500, "Cannot get User."));
    }
    return res.status(200).json(user);
};

export const getUsers = async (_req, res, next) => {
    const users = await User.find();
    if (!users) {
        return next(createError(500, "Cannot get Users."));
    }
    return res.status(200).json(users);
};
