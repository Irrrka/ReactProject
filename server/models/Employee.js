const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId, Date } = Schema.Types;

const employeeSchema = new Schema({

    position: {
        type: String,
        required: true,
    },
    skills: {
        type: String,
        required: true,
    },
    companyExperience: {
        type: Number,
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
    endorcedPoints: {
        type: Number,
        required: false
    }

});

module.exports = new Model('Employee', employeeSchema);