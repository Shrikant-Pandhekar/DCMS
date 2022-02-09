const Admin = require("../models/admin");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const formidable = require("formidable");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

exports.adminSignup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res
      .status(422)
      .json({ error: "Please fill all fields properly ..." });
  }

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: errors.array()[0].msg, message: "Validation error" });
    }

    const adminExists = await Admin.findOne({ email: email });

    if (adminExists) {
      return res.status(422).json({ error: "Email already exist" });
    }

    const admin = new Admin(req.body);

    const adminRegistered = await admin.save();

    if (adminRegistered) {
      return res
        .status(201)
        .json({ message: "Admin Registered Successfully ..." });
    } else {
      return res.status(500).json({ error: "Failed to Register" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.adminSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const admin = await Admin.findOne({ email: email });

    if (admin) {
      if (!admin.authenticate(password)) {
        return res.status(401).json({
          error: "Invalid Credentials !!",
        });
      }

      const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);

      res.cookie("token", token, { expire: new Date() + 9999 });

      const { _id, firstname, lastname, email, role } = admin;

      return res.json({
        token,
        admin: { _id, firstname, lastname, email, role },
      });
    } else {
      res.status(400).json({
        error: "Admin Email does not exists",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.adminSignout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Admin Signout Successfully",
  });
};

exports.isAdminSignedin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "admin",
  algorithms: ["sha1", "RS256", "HS256"],
});

exports.getAdminById = async (req, res, next, id) => {
  try {
    const admin = await Admin.findById(id);

    console.log(admin);

    if (!admin) {
      return res.status(400).json({
        error: "You do not have authority",
      });
    }

    req.profile = admin;

    next();
  } catch (error) {
    return res.status(400).json({
      error: "NO Admin found",
    });
  }
};

exports.isAdminAuthenticated = (req, res, next) => {
  let checker = req.profile && req.admin && req.profile._id == req.admin._id;

  if (!checker) {
    return res.status(403).json({
      error: "ACCSESS DENIED",
    });
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not Admin , ACCESS DENIED",
    });
  }

  next();
};

exports.allPatients = async (req, res) => {
  try {
    const patients = await User.find(
      { isPatient: true },
      {
        firstname: 1,
        lastname: 1,
        mobile: 1,
        gender: 1,
        email: 1,
        appointment: 1,
      }
    );

    return res.status(200).json(patients);
  } catch (error) {
    console.log(error);
  }
};

exports.getPatient = async (req, res) => {
  try {
    const patients = await User.find(
      { _id: req.params.id },
      {
        firstname: 1,
        lastname: 1,
        mobile: 1,
        gender: 1,
        email: 1,
        appointment: 1,
      }
    );

    return res.status(200).json(patients);
  } catch (error) {
    console.log(error);
  }
};

exports.allAppoitments = async (req, res) => {
  try {
    const users = await User.find(
      {},
      { firstname: 1, lastname: 1, mobile: 1, gender: 1, appointment: 1 }
    );

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

exports.getTodaysAppoitments = async (req, res) => {
  try {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    var todaydate = `${date < 10 ? `0${date}` : `${date}`}${
      month < 10 ? `0${month}` : `${month}`
    }${year}`;
    console.log(todaydate);
    const status = "pending";
    const users = await User.find(
      { "appointment.date": todaydate, "appointment.status": status },
      { firstname: 1, lastname: 1, mobile: 1, gender: 1, appointment: 1 }
    );

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

exports.getNumbers = async (req, res) => {
  try {
    const usercount = await User.count();
    // const appointmencount = await User.aggregate([{$unwind:"$appointment"}, {$project: {appointment: {$size: '$appointment'}}},
    //{$group:{_id:"$_id", total: {$sum: "$appointment"}}}])

    const appointmencount = await User.aggregate([
      {
        $group: {
          _id: null,
          total_count: { $sum: { $size: "$appointment" } },
        },
      },
    ]);

    return res.status(200).json({
      usercount: usercount,
      appointmencount: appointmencount[0].total_count,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addPrescription = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, file) => {
      // console.log(err,fields,file);
      //console.log(file);

      if (err) {
        return res.status(400).json({
          error: "Problem with image",
        });
      }

      const { appointmentId, prescription, prescriptionImage } = fields;

      if (!prescription) {
        return res.status(400).json({
          error: "Name field is empty !",
        });
      }

      const updatedFields = {
        status: "approved",
        prescription: prescription,
        prescriptionImage: prescriptionImage,
      };

      const user = await User.findById(req.user._id);

      //var index = user.appointment.indexOf(4755);
      //let index = user.appointment.find(o => o.id === appointmentId);

      function searchxx(appointmentId, myArray) {
        for (var i = 0; i < myArray.length; i++) {
          if (myArray[i].id === appointmentId) {
            return myArray[i];
          }
        }
      }
      function searchindex(appointmentId, myArray) {
        for (var i = 0; i < myArray.length; i++) {
          if (myArray[i].id === appointmentId) {
            return i;
          }
        }
      }

      var index = searchindex(parseInt(appointmentId), user.appointment);
      var appObj = searchxx(parseInt(appointmentId), user.appointment);

      if (file.prescriptionImage) {
        if (file.prescriptionImage.size > 3000000) {
          return res.status(400).json({
            error: "File size too big",
          });
        }

        // formidable - V2
        appObj.prescriptionImage.data = fs.readFileSync(
          file.prescriptionImage.filepath
        );
        appObj.prescriptionImage.contentType = file.prescriptionImage.mimetype;
      }

      appObj.status = "approved";
      appObj.prescription = prescription;

      // handle file

      //appObj.prescriptionImage = prescriptionImage;

      //console.log(user.appointment);

      console.log(index);
      console.log(appObj);

      // save to DB
      if (index !== -1) {
        user.appointment.splice(index, 1);
      }
      user.appointment.push(appObj);
      user.save();
      return res.status(201).json({
        messege: "Successful",
      });
      //User.updateOne({_id:req.user.id}, {$set:{'appointment[index].status':'approved'}})
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error,
    });
  }
};
