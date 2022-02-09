const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        error: "NO user found in database",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "NO user found in database vv",
    });
  }
};

exports.getUser = (req, res) => {
  req.user.salt = undefined;
  req.user.secure_password = undefined;
  return res.json(req.user);
};

exports.getUserNoauth = (req, res) => {
  return res.json({ username: req.user.firstname, gender: req.user.gender });
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );

    user.salt = undefined;
    user.secure_password = undefined;
    res.json(user);
  } catch (error) {
    return res.status(400).json({
      error: "You are not allowed to update this info",
    });
  }
};

exports.makeAnAppointmentUser = async (req, res) => {
  try {
    // console.log(req.user._id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: errors.array()[0].msg, message: "validation error" });
    }

    const user = await User.findById(req.user._id);

    var val = Math.floor(1000 + Math.random() * 9000);
    console.log(val);

    var y = {
      id: val,
      status: "pending",
      date: req.body.date,
      time: req.body.time,
      prescription: null,
      prescriptionImage: {
        data: undefined,
        contentType: undefined,
      },
    };

    user.appointment.push(y);

    user.save();

    return res.status(200).json({
      success: "Appointment Successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "appoitnment error",
    });
  }
};

exports.getNumbers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    var pending = user["appointment"].filter((x) => x.status == "pending");
    var completed = user["appointment"].filter((x) => x.status == "approved");
    var pending_count = pending.length;
    var completed_count = completed.length;
    return res.status(200).json({
      pending_appointment: pending_count,
      completed_appointment: completed_count,
    });
  } catch (error) {
    console.log(error);
  }
};
