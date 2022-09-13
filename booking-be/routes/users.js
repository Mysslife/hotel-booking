import express from "express";
import {
  deleteUser,
  getAllUser,
  getOneUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// // CHECK AUTHENTICATION:
// router.get("/checkauthentication", verifyToken, (req, res) => {
//   res.send("hi I'm authenticated");
// });

// // CHECK USER:
// router.get("/checkuser/:id", verifyUser, (req, res) => {
//   res.send("hi I'm an user");
// });

// // CHECK ADMIN:
// router.get("/checkadmin/:id", verifyAdmin, (req, res) => {
//   res.send("hi I'm an admin");
// });

// UPDATE
router.put("/:id", verifyUser, updateUser);

// DELETE
// router.delete("/:id", verifyUser, deleteUser);
// không set được cookie ????
router.delete("/:id", deleteUser);

// GET ONE USER
router.get("/:id", verifyUser, getOneUser);

// GET ALL USERS
// router.get("/", verifyUser, getAllUser);
// không set được cookie ????
router.get("/", getAllUser);

export default router;
