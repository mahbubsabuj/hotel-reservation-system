import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.id;
    let room = new Room(req.body);
    room = await room.save();
    if (!room) {
        return next(createError(500, "Room cannot be created."));
    }
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: room._id } });
    if (!updatedHotel) {
        return next(500, "Hotel room cannot be updated.");
    }
    return res.status(200).json(room);
}

export const updateRoom = async (req, res, next) => {
    const id = req.params.id;
    const room = await Room.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    if (!room) {
        return next(createError(500, "Room cannot be updated."));
    }
    return res.status(200).json(room);
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const roomId = req.params.roomId;
    const deletedRoom = await Room.findByIdAndDelete(roomId);
    if (!deletedRoom) {
        return next(createError(500, "Room cannot be deleted."));
    }
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomId } });
    if (!updatedHotel) {
        return next(createError(500, "Hotel cannot be updated."));
    }
    return res.status(200).json({ success: true, message: "Room has been deleted." });
}

export const getRoom = async (req, res, next) => {
    const id = req.params.id;
    const room = await Room.findById(id);
    if (!room) {
        return next(createError(500, "Cannot get room."));
    }
    return res.status(200).json(room);
}

export const getRooms = async (_req, res, next) => {
    const rooms = await Room.find();
    if (!rooms) {
        return next(createError(500, "Cannot get rooms."));
    }
    return res.status(200).json(rooms);
}


