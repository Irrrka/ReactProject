const models = require('../models');

module.exports = {
    post: (req, res, next) => {
        const { nomination, employeeId } = req.body;
        const { _id } = req.user;
        

        models.Nomination.create({ nomination, createdBy: _id })
            .then((createdNomination) => {
                return Promise.all([
                    models.Employee.updateOne({ _id: employeeId }, { $push: { nominations: createdNomination } }),
                    models.Nomination.findOne({ _id: createdNomination._id })
                ]);
            })
            .then(([modifiedObj, obj]) => {
                res.send(obj);
            })
            .catch(next);
    }
};