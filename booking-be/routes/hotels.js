import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotel,
  getOneHotel,
  updateHotel,
  countByCity,
  countByType,
  getHotelRooms,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
// router.post("/", verifyAdmin, createHotel);
// không tạo được cookie nên dùng tạm url dưới không cần verify admin
router.post("/", createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
// router.delete("/:id", verifyAdmin, deleteHotel);
// Không set được cookie ?
router.delete("/:id", deleteHotel);

// GET ONE HOTEL
router.get("/find/:id", getOneHotel);

// GET ALL HOTELS
router.get("/", getAllHotel);

// COUNT NUMBER OF HOTELS BY CITY:
router.get("/countByCity", countByCity);

// COUNT NUMBER OF HOTELS BY TYPE:
router.get("/countByType", countByType);

// GET ALL ROOMS OF A HOTEL: - id của hotel
router.get("/room/:id", getHotelRooms);

export default router;
