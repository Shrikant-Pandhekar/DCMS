const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
uuidv4();

var userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true,
        },

        lastname: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        gender: {
            type: String,
            trim: true,
        },

        dob : {
            type: String,
            trim: true,
            default: "NULL",
        },

        mobile : {
            type: String,
            maxlength: 12,
            trim: true,
        },

        address : {
            type: String,
            maxlength: 100,
            trim: true,
        },

        appointment: {
            type: Array,
            // default: {
            //     id:Number,
            //     status:"pending", // approved , completed , rejected
            //     date: String,
            //     time: String,
            //      discription: String,
            //      developerImage: {
            //data: Buffer,
            //contentType: String,
        //},
            //
            // },
        },

        isPatient: {
            type: String,
            default: false,
        },

        secure_password: {
            type: String,
            required: true,
        },

        salt: String,

        role: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps : true,
    },
);


userSchema.virtual('password')
    .set(function(password){
        this._password = password;
        this.salt = uuidv4();
        this.secure_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    })

userSchema.methods = {

    authenticate : function(plainPassword){
        return this.securePassword(plainPassword) === this.secure_password
    },

    securePassword : function(plainPassword){
        if(!plainPassword) return '';

        try {
            return crypto.createHmac('sha256',this.salt).update(plainPassword).digest('hex');
        } catch (error) {
            return '';
        }
    },
}

module.exports = mongoose.model("User" , userSchema);