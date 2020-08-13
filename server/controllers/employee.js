const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        models.Employee.find().populate('users').populate('nominations')
            .then((employee) =>{
                res.send(employee)
            } )
            .catch(next);
    },

    post: (req, res, next) => {
        const { client, username, email, time } = req.body;    //const { _id } = req.user;
console.log(req.body)
        models.Client.create({ client, username, email, time})
            .then((client) => {
      console.log('Inside', client, username, email, time)
        
               
           
            })
            .catch(next);
    },

    post: (req, res, next) => {
        const { name, email, position, startDate } = req.body;
        const { _id } = req.user;

        models.Employee.create({ name, email, position, startDate, user: _id })
            .then((employee) => {
                return Promise.all([
                    models.User.updateOne({ _id }, { employee } ),
                    models.Employee.findOne({ _id: employee._id })
                ]);
            })
            .then(([modifiedObj, employeeObj]) => {
                res.send(employeeObj);
            })
            .catch(next);
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { position } = req.body;
        models.Employee.updateOne({ _id: id }, { position })
            .then((updated) => res.send(updated))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.Employee.deleteOne({ _id: id })
            .then((removed) => res.send(removed))
            .catch(next)
    }
};