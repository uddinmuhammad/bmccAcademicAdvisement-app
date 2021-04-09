import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let StudentSchema = new Schema({
    _id: new Schema.Types.ObjectId,
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
    
    // major: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Major'
    // },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    },

});

const model = mongoose.model("Student", StudentSchema);

module.exports = model;