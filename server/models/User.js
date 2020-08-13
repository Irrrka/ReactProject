const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const userSchema = new Schema({

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        require: true
    },

    nominations: [{ type: ObjectId, ref: "Nomination" }],
    createdNominations: [{ type: ObjectId, ref: "Nomination" }],
    role: [{type: String}],
    
    employee: { 
        type: ObjectId, 
        ref: "Employee" }
});

userSchema.methods = {

    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }

};

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) { next(err); return }
                this.password = hash;
                next();
            });
        });
        return;
    }
    next();
});

module.exports = new Model('User', userSchema);