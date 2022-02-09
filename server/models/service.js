const mongoose = require('mongoose');

var serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true,
        },

        short_description: {
            type: String,
            required: true,
            maxlength: 5000,
            trim: true,
        },

        long_description: {
            type: String,
            required: true,
            maxlength: 10000,
            trim: true,
        },

        service_icon: {
            data: Buffer,
            contentType: String,
        },

        img1: {
            data: Buffer,
            contentType: String,
        },

        img2: {
            data: Buffer,
            contentType: String,
        }
    },
    {
        timestamps : true,
    },
);

module.exports = mongoose.model("Service" , serviceSchema);