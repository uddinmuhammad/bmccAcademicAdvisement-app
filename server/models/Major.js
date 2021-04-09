import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let MajorSchema = new Schema({
    _id: new Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    courses : [],
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    },

});

const model = mongoose.model("Major", MajorSchema);

module.exports = model;