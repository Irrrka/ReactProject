const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        models.Employee.find().sort('-created_at').populate('nominations')
            .then((employees) => res.send(employees))
            .catch(next);
    },

    post: (req, res, next) => {
        const { name, position, startDate } = req.body;
        const { _id } = req.user;

        models.Employee.create({ name, position, startDate, user: _id })
            .then((createdEmployee) => {
                return Promise.all([
                    models.User.updateOne({ _id }, { employee: createdEmployee }),
                ]);
            })
            .then(([modifiedObj, emplObj]) => {
                res.send(emplObj);
            })
            .catch(next);
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { position } = req.body;
        models.Employee.updateOne({ _id: id }, { position })
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