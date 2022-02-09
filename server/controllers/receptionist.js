const Receptionist = require('../models/receptionist');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const dotenv = require("dotenv");
dotenv.config({path:'./config.env'});

exports.receptionistSignup = async (req,res) => {

    const {firstname, lastname, email, password} = req.body;

    if (!firstname || !lastname || !email || !password ) {
        return res.status(422).json({error:"Please fill all fields properly ..."});
    }
    
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg, message:"Validation error" });
        }

        const receptionistExists = await Receptionist.findOne({ email: email });
        
        if (receptionistExists) {
            return res.status(422).json({ error: "Email already exist" });
        }

        const receptionist = new Receptionist(req.body);

        const receptionistRegistered = await receptionist.save();

        if (receptionistRegistered) {
            return res.status(201).json({ message: "Receptionist Registered Successfully ..."});
        }
        else {
            return res.status(500).json({ error: "Failed to Register"});
        }
        
    } catch (error) {
        console.log(error);
    }    
}

exports.receptionistSignin = async (req,res) => {
    
    try {

        const { email, password } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }

        const receptionist = await Receptionist.findOne({ email: email });

        if (receptionist) {

            if(!receptionist.authenticate(password)){
                return res.status(401).json({
                    error: "Invalid Credentials !!"
                })
            }

            const token = jwt.sign({_id: receptionist._id}, process.env.JWT_SECRET);

            res.cookie('token', token, {expire: new Date() + 9999});

            const { _id, firstname, lastname, email, role} = receptionist;

            return res.json({token, receptionist: {_id, firstname, lastname, email, role}})
        }
        else{
            res.status(400).json({
                error: "Receptionist Email does not exists"
            })
        }
        
    } catch (error) {
        console.log(error);
    }

}

exports.receptionistSignout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message:"Receptionist Signout Successfully"
    });
}

exports.isReceptionistSignedin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "receptionist",
    algorithms: ['sha1', 'RS256', 'HS256']
});

exports.isReceptionistAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "ACCSESS DENIED"
        })
    }
    next();
}