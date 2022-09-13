import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

// CREATE
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
    return res.status(200).json(savedRoom);
  } catch (err) {
    return next(err);
  }
};

// UPDATE
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedRoom);
  } catch (err) {
    return next(err);
  }
};

// AVAILABILITY
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    return res.status(200).json("Room has been updated!");
  } catch (err) {
    return next(err);
  }
};

// DELETE
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });

    return res.status(200).json("Deleted Room successfully!");
  } catch (err) {
    return next(err);
  }
};

// GET ONE ROOM
export const getOneRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    return res.status(200).json(room);
  } catch (err) {
    return next(err);
  }
};

// GET ALL ROOMS
export const getAllRoom = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    return res.status(200).json(rooms);
  } catch (err) {
    return next(err);
  }
};

// GET A HOTEL BY ROOM ID:
export const getHotelByRoomId = async (req, res, next) => {
  const roomId = req.params.id;
  try {
    const hotel = await Hotel.findOne({ rooms: roomId });
    if (!hotel) return next(createError(404, "Hotel not found!"));

    return res.status(200).json(hotel);
  } catch (err) {
    return next(err);
  }
};
