const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
uuidv4();

var receptionistSchema = new mongoose.Schema(
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

        mobile : {
            type: String,
            maxlength: 12,
            trim: true,
        },

        qualifications:{
            type: String,
            trim: true,
        },

        experience : {
            type: String,
            maxlength: 100,
            trim: true,
        },

        secure_password: {
            type: String,
            required: true,
        },

        salt: String,

        role: {
            type: Number,
            default: 1,
        },
    },
    {
        timestamps : true,
    },
);


receptionistSchema.virtual('password')
    .set(function(password){
        this._password = password;
        this.salt = uuidv4();
        this.secure_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    })

receptionistSchema.methods = {

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

module.exports = mongoose.model("Receptionist" , receptionistSchema);