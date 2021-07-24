const mongoose = require('mongoose');
const db = require('../database.js');

const StudentSchema = mongoose.Schema({
    emplId: {
        type: Number,
        required: true
    },
    name: {
        firstName: {
            type : String, 
            required: true
        },
        lastName: {
            type : String, 
            required: true
        }
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: false
    },
    major:{
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    },

});

const Student = mongoose.model("Students", StudentSchema);

module.exports = Student;