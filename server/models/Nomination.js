const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, ObjectId } = Schema.Types;

const nominationSchema = new Schema({
    
    nomination: [{
        type: String,
        required: true,
    }],

    createdBy: {
        type: ObjectId,
        ref: "User"
    }

})

module.exports = new Model('Nomination', nominationSchema);