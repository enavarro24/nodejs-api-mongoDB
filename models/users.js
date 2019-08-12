const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const UserSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    name: String,
    avatar : String,
    password: {type: String, select: false},
    signUpDate: {type: Date, default: Date.now()},
    lastLogIn: Date
});

UserSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, function (error, salt) {
        if (error) {
            return next(error);
        }

        bcrypt.hash(user.password, salt, null, function (error, hash) {
            if (error) {
                return next(error);
            }

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.gravatar = function () {
    if (!this.email) {
        return 'https://gravatar.com/avatar/?s=200&d=retro';
    }

    const md5 = crypto.createHash('md5').update(this.email).digest('hex');

    return 'https://gravatar.com/avatar/' + md5 + '?s=200&d=retro';
};


module.exports = mongoose.model('Users', UserSchema);

