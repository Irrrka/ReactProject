const models = require('../models');
const config = require('../config/config');
const utils = require('../utils');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    get: (req, res, next) => {
        models.User.findById(req.query.id).populate('employees')
            .then((result) => {
                const user = {
                    username: result.username,
                    employees: result.employees
                }
                res.send(user)
            })
            .catch(next)
    },

    post: {
        register: (req, res, next) => {
            const { username, password } = req.body;
            models.User.create({ username, password })
                .then((createdUser) => {
                    const token = utils.jwt.createToken({ id: createdUser._id });
                    res.header('auth', token).send(createdUser);
                })
                .catch((e) => {
                    if (e.code === 11000) {
                        res.send({
                            error: 'This username is already taken'
                        });
                    }
                })
        },

        verifyLogin: (req, res, next) => {
            const token = req.headers.auth || '';

            Promise.all([
                utils.jwt.verifyToken(token),
                models.TokenBlacklist.findOne({ token })
            ])
                .then(([data, blacklistToken]) => {
                    if (blacklistToken) { return Promise.reject(new Error('blacklisted token')) }

                    models.User.findById(data.id).populate('employees')
                        .then((user) => {
                            return res.send({
                                status: true,
                                user
                            });
                        });
                })
                .catch(err => {

                    if (['token expired', 'blacklisted token', 'jwt must be provided'].includes(err.message)) {
                        res.status(401).send('UNAUTHORIZED!');
                        return;
                    }

                    res.send({
                        status: false
                    });
                })
        },

        login: (req, res, next) => {
            const { username, password } = req.body;
            models.User.findOne({ username }).populate('employees')
                .then((user) => Promise.all([user, user.matchPassword(password)]))
                .then(([user, match]) => {
                    if (!match) {
                        res.status(401).send('Invalid password');
                        return;
                    }

                    const token = utils.jwt.createToken({ id: user._id });
                    res.header('auth', token).send(user);
                })
                .catch(next);
        },

        logout: (req, res, next) => {
            const token = req.cookies[config.authCookieName];
            console.log('-'.repeat(100));
            console.log(token);
            console.log('-'.repeat(100));
            models.TokenBlacklist.create({ token })
                .then(() => {
                    res.clearCookie(config.authCookieName).send('Logout successfully!');
                })
                .catch(next);
        }
    },

    put: async (req, res, next) => {
        const id = req.params.id;
        let { username, password } = req.body;


        if (password) {
            password = await new Promise((resolve, reject) => {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    if (err) {
                        reject(err)
                    }
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) {
                            reject(err)
                        }
                        resolve(hash);
                    });
                });

            });
        }

        models.User.updateOne({ _id: id }, { username, password })
            .then((updatedUser) => res.send(updatedUser))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.User.deleteOne({ _id: id })
            .then((removedUser) => res.send(removedUser))
            .catch(next)
    },

};