import mongoose from "mongoose";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createHotel = async (req, res, next) => {
  let hotel = new Hotel(req.body);
  hotel = await hotel.save();
  if (!hotel) {
    return next(createError(500, "Hotel cannot be created."));
  }
  return res.status(201).json({ hotel });
};

export const updateHotel = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return next(createError(403, "Invalid Hotel ID."));
  }
  const updatedHotel = await Hotel.findByIdAndUpdate(
    id,
    { $set: req.body },
    { new: true }
  );
  if (!updatedHotel) {
    return next(createError(500, "Hotel cannot be updated."));
  }
  return res.status(200).json(updatedHotel);
};

export const deleteHotel = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return next(createError(403, "Invalid Hotel ID."));
  }
  const deletedHotel = await Hotel.findByIdAndDelete(id);
  if (!deletedHotel) {
    return next(createError(500, "Hotel cannot be deleted."));
  }
  return res
    .status(200)
    .json({ success: true, message: "Hotel has been deleted." });
};

export const getHotel = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return next(createError(403, "Invalid Hotel ID."));
  }
  const hotel = await Hotel.findById(id);
  if (!hotel) {
    return next(createError(500, "Cannot get Hotel."));
  }
  return res.status(200).json(hotel);
};

export const getHotels = async (_req, res, next) => {
  const hotels = await Hotel.find();
  if (!hotels) {
    return next(createError(500, "Cannot get Hotels."));
  }
  return res.status(200).json(hotels);
};
