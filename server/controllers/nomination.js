const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        //TODO filter by user
        models.Nomination.find().populate('users')
            .then((nominations) => res.send(nominations))
            .catch(next);
    },

    post: (req, res, next) => {
        const { description, voteNumber } = req.body;
        const { _id } = req.user;
      
        models.Nomination.create({ description, voteNumber, author: _id })
            .then((created) => {
                return Promise.all([
                    models.User.updateOne({ _id }, { $push: { createdNominations: created } }),
                    models.Nomination.findOne({ _id: created._id })
                ]);
            })
            .then(([modifiedObj, nomObj]) => {
                res.send(nomObj);
            })
            .catch(next);
    },

//     put: (req, res, next) => {
//         const id = req.params.id;
//         const { _id } = req.user;

//         const { description } = req.body;

//         models.Nomination.updateOne({ _id: id }, { description })
//             .then((updated) => {
// //                console.log(updated)
//                  res.send(updated)
//                 })
//             .catch(next)
//     },

    // delete: (req, res, next) => {
    //     const id = req.params.id;

    //     models.Nomination.deleteOne({ _id: id })
    //         .then((removed) => res.send(removed))
    //         .catch(next)
    // }
};