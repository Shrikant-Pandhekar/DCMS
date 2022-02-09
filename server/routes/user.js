const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  getUserById,
  getUser,
  updateUser,
  makeAnAppointmentUser,
  getUserNoauth,
  getNumbers,
} = require("../controllers/user");
const { isSignedin, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedin, isAuthenticated, getUser);
router.get("/usernoauth/:userId", getUserNoauth);
router.get("/admin/user/:userId", isSignedin, isAdmin, getUser);
router.put("/user/:userId", isSignedin, isAuthenticated, updateUser);
router.put("/admin/user/:userId", isSignedin, isAdmin, updateUser);
router.get("/user/numbers/:userId", getNumbers);

// makeAnAppointmentUser
router.put(
  "/user/makeappointment/:userId",
  [
    check("date", "Enter Appropriate Date").isLength({ min: 8 }),
    check("time", "Enter Appropriate Time").isLength({ min: 4 }),
  ],
  isSignedin,
  makeAnAppointmentUser
);

module.exports = router;
