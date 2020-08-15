const models = require('../models');

module.exports = {
    get: (req, res, next) => {
      const length = req.query.length ? parseInt(req.query.length) : 10
        models.Nomination.find().sort('-created_at').limit(length).populate('author').populate('nominee')
            .then((nominations) => res.send(nominations))
            .catch(next);
    },

    post: (req, res, next) => {
        const { description, username } = req.body;
        const { _id } = req.user;
//TODO username
        models.Nomination.create({ description, nominee: username, author: _id })
            .then((createdNomination) => {
                return Promise.all([
                    models.User.updateOne({ _id }, { $push: { createdNominations: createdNomination } }),
                    models.Employee.updateOne({ username }, { $push: { nominations: createdNomination } }),
                    models.Employee.updateOne({ username }, { rating: rating+1 } ),
                    models.Nomination.findOne({ _id: createdNomination._id })
                ]);
            })
            .then(([modifiedObj, nomObj]) => {
                res.send(nomObj);
            })
            .catch(next);
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { description } = req.body;
        models.Origami.updateOne({ _id: id }, { description })
            .then((updatedNom) => res.send(updatedNom))
            .catch(next)
    },

    // delete: (req, res, next) => {
    //     const id = req.params.id;
    //     models.Origami.deleteOne({ _id: id })
    //         .then((removedNom) => res.send(removedNom))
    //         .catch(next)
    // }
};