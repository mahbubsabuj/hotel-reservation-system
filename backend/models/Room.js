import mongoose from "mongoose";

const RoomSchema = mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    maxPeople: { type: String, required: true },
    roomNumbers: [{ number: String, unavailableDates: { type: [Date] } }]
});

export default mongoose.model("Room", RoomSchema);