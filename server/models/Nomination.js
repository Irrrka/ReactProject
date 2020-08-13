const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId, Date } = Schema.Types;

const nominationSchema = new Schema({

    description: {
        type: String,
        required: true
    },
    voteNumber:{
        type: Number,
        required: true,
    },
    author: {
        type: ObjectId,
        ref: "User"
    }

});

module.exports = new Model('Nomination', nominationSchema);