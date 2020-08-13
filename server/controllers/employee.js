const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        const length = req.query.length ? parseInt(req.query.length) : 10
        //todo user?
        models.Employee.find().sort(-'created_at').limit(length).populate('user')
            .then((employees) => res.send(employees))
            .catch(next);
    },

    post: (req, res, next) => {
        const { position, companyExperience, startDate } = req.body;
        const { _id } = req.user;

        models.Employee.create({ position, companyExperience, startDate, skills, user: _id })
            .then((createdEmployee) => {
                return Promise.all([
                    models.User.updateOne({ _id }, { $push: { posts: createdEmployee } }),
                    models.Employee.findOne({ _id: createdEmployee._id })
                ]);
            })
            .then(([modifiedObj, employeeObj]) => {
                res.send(employeeObj);
            })
            .catch(next);
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { position, skills } = req.body;
        models.Employee.updateOne({ _id: id }, { position, skills })
            .then((updatedEmployee) => res.send(updatedEmployee))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.Employee.deleteOne({ _id: id })
            .then((removedEmployee) => res.send(removedEmployee))
            .catch(next)
    }
};