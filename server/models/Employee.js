const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, ObjectId } = Schema.Types;

const employeeSchema = new Schema({
    
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    position: {
        type: String,
        required: true,
    },
    
    nominations: [{
        type: ObjectId,
        ref: "User"
    }],

    createdBy: {
        type: ObjectId,
        ref: "User"
    }

}, { timestamps: { createdAt: 'created_at' } });

module.exports = new Model('Employee', employeeSchema);