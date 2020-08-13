const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId, Date } = Schema.Types;

const employeeSchema = new Schema({

    // title:{
    //     type: String
    // },
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

module.exports = new Model('Employee', employeeSchema);