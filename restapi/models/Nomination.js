const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const nominationSchema = new Schema({

    description: {
        type: String,
        required: true,
    },

    author: {
        type: ObjectId,
        ref: "User"
    },

    nominee: {
        type: ObjectId,
        ref: "Employee"
    }

}, { timestamps: { createdAt: 'created_at' } });

module.exports = new Model('Nomination', nominationSchema);