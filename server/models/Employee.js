const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId, Date } = Schema.Types;

const employeeSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    user: {
        type: ObjectId,
        ref: "User"
    },
    nominations: [{ type: ObjectId, ref: "Nomination" }],

    // skills: {
    //     type: String,
    //     required: true,
    // },
    // companyExperience: {
    //     type: Number,
    //     required: true,
    // },

});

module.exports = new Model('Employee', employeeSchema);