const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        models.Employee.find()
        //.sort('-created_at')
            .then((employee) => {res.send(employee)})
            .catch(next);
    },

    getDetails: (req, res, next) => {
        models.Employee.findById(req.query.id).populate('createdBy', 'username').populate('username')
            .then((employee) => {
                res.send(employee)
            })
            .catch(next);
    },

    post: (req, res, next) => {
        const {
            name,
            email,
            position,
        } = req.body;
        const { _id } = req.user;
        models.Employee.create({ name, email, position, createdBy: _id })
            .then((createdEmployee) => {
                return Promise.all([
                    models.User.updateOne({ _id }, { $push: { employees: createdEmployee } }),
                    models.Employee.findOne({ _id: createdEmployee._id })
                ]);
            })
            .then(([modifiedObj, obj]) => {
                res.send(obj);
            })
            .catch(next);
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const {
            name,
            position,
            } = req.body;

        models.Employee.updateOne({ _id: id }, { name, position })
            .then((updatedEmployee) => res.send(updatedEmployee))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.Employee.deleteOne({ _id: id })
            .then((deletedEmployee) => res.send(deletedEmployee))
            .catch(next)
    },

    like: (req, res, next) => {
        const id = req.params.id;
        const { _id } = req.user;

        models.Employee.findByIdAndUpdate({ _id: id }, { $push: { likes: _id } }, { new: true, useFindAndModify: false }).populate('likes', 'username')
            .then((updatedEmployee) => {
                res.send(updatedEmployee)
            })
            .catch(next);
    },

    nominate: (req, res, next) => {
        const id = req.params.id;
        const {
            nomination,
            } = req.body;

        models.Employee.findByIdAndUpdate({ _id: id }, { $push: { nominations: nomination } }, { new: true, useFindAndModify: false }).populate('username')
            .then((updatedEmployee) => {
                res.send(updatedEmployee)
            })
            .catch(next);
    }
};