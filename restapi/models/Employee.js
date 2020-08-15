const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const employeeSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true
    },

    position: {
        type: String,
        unique: true,
        required: true
    },

    startDate: {
        type: Date,
        required: true
    },

    nominations: [{ type: ObjectId, ref: "Nomination" }],

    rating: { type: Number },

    user: {
        type: ObjectId, 
        ref: "User"
    }

}, { timestamps: { createdAt: 'created_at' } });

module.exports = new Model('Employee', employeeSchema);