const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

var questionSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: "User",
             required: true,
            },
    
         question: {
            type: String,
            required: true,
            maxlength: 500,
            trim: true,
        },
         email: {
            type: String,
            required: true,
            maxlength: 500,
            trim: true,
        },

        answer: {
            type: String,
            maxlength: 5000,
            trim: true,
            default: "unanswered"

        },
        
    },
    {
        timestamps : true,
    },
);

module.exports = mongoose.model("Question" , questionSchema);