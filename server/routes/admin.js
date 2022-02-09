const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  adminSignup,
  adminSignin,
  adminSignout,
  allPatients,
  allAppoitments,
  getNumbers,
  getTodaysAppoitments,
  addPrescription,
  getPatient,
} = require("./../controllers/admin");
const { getUserById } = require("./../controllers/user");
router.param("userid", getUserById);

router.post(
  "/admin/signup",
  [
    check("firstname", "Firstname must be more than 2 char").isLength({
      min: 2,
    }),
    check("lastname", "Lastname must be more than 2 char").isLength({ min: 2 }),
    check("email", "Invalid Email").isEmail(),
    check(
      "password",
      "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character."
    )
      .isLength({ min: 8 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
  ],
  adminSignup
);

router.post(
  "/admin/signin",
  [
    check("email", "Invalid Email").isEmail(),
    check("password", "Password is required").isLength({ min: 1 }),
  ],
  adminSignin
);

router.get("/admin/signout", adminSignout);

router.get("/admin/patient/all", allPatients);
router.get("/admin/patient/:id", getPatient);

router.get("/admin/appointment/all", allAppoitments);
router.get("/admin/appointment/today", getTodaysAppoitments);
router.get("/admin/numbers", getNumbers);

router.post("/admin/addprescription/:userid", addPrescription);

module.exports = router;
