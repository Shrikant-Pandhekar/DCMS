const mongoose = require('mongoose');

var blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true,
        },

        author: {
            type: String,
            maxlength: 50,
        },

        description: {
            type: String,
            required: true,
            maxlength: 5000,
            trim: true,
        },

        imgurl: {
            type: String,
            
        },
    },
    {
        timestamps : true,
    },
);

module.exports = mongoose.model("Blog" , blogSchema);