import express from "express";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getOneRoom,
  getAllRoom,
  updateRoomAvailability,
  getHotelByRoomId,
} from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE:
// id này là id của hotel chứa room đang tạo, vì khi tạo xong bất kỳ room nào cũng phải add vào trong property rooms của một hotel.
// router.post("/:hotelid", verifyAdmin, createRoom);
// không set được cookie nên dùng tạm url dưới
router.post("/:hotelid", createRoom);

// UPDATE
router.put("/:id", verifyAdmin, updateRoom);

// UPDATE AVAILABILITY:
router.put("/availability/:id", updateRoomAvailability);

// DELETE
// router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
// không set được cookie nên dùng tạm url dưới
router.delete("/:id/:hotelid", deleteRoom);

// GET ONE ROOM
router.get("/:id", getOneRoom);

// GET ALL ROOMS
router.get("/", getAllRoom);

// GET A HOTEL BY ROOM ID:
router.get("/findhotel/:id", getHotelByRoomId);

export default router;
