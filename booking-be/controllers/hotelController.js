import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// CREATE
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    return res.status(200).json(savedHotel);
  } catch (err) {
    return next(err);
  }
};

// UPDATE
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedHotel);
  } catch (err) {
    return next(err);
  }
};

// DELETE
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    return res.status(200).json("Deleted hotel successfully!");
  } catch (err) {
    return next(err);
  }
};

// GET ONE HOTEL
export const getOneHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    return res.status(200).json(hotel);
  } catch (err) {
    return next(err);
  }
};

// GET ALL HOTELS
export const getAllHotel = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    let hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gte: min || 1, $lte: max || 999 },
    }).limit(req.query.limit);

    return res.status(200).json(hotels);
  } catch (err) {
    return next(err);
  }
};

// GET NUMBER OF HOTELS BY CITY NAME:
export const countByCity = async (req, res) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    console.log(list);
    return res.status(200).json(list);
  } catch (err) {
    return next(err);
  }
};

// GET NUMBER OF HOTELS BY TYPE:
export const countByType = async (req, res) => {
  const types = req.query.types.split(",");
  try {
    const list = await Promise.all(
      types.map((type) => {
        return Hotel.countDocuments({ type: type });
      })
    );
    return res.status(200).json(list);
  } catch (err) {
    return next(err);
  }
};

// GET ALL ROOMS OF A HOTEL: - id của hotel
export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((roomId) => {
        return Room.findById(roomId);
      })
    );

    return res.status(200).json(list);
  } catch (err) {
    return next(err);
  }
};
