const db = require("../models/index.js");
const mongoose = require('mongoose');

/**
 * Toute les requetes disponibles pour l'url '/events'
 */

// Récupération de tous les événements
exports.getAllEvents = async (req, res) => {
    db.Event.find({}).exec(function (err, events) {
            if (err) {
                return res.send(err);
            }
            res.json(events)
        })
}

// Création d'un utilisateur
exports.createEvents = async ( req, res) => {
        console.log("Les infos de l'événement ",req.body)
        const Events = new db.Event({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            mail: req.body.mail,
            password:  await hashThis(req.body.password),
            role: req.body.role
        })
        Events.save(function (err) {
            if (err) {
                return res.send(err);
            } else {
                return res.json(Events)
            }
        })
}

//Modification d'un utilisateur
exports.updateEvents = async (req, res) => {
    db.Event.findById(req.params.id, function (err, Events) {
        if (err) {
            return res.send(err);
        } else {
            //Si le champs n'est pas renseigné alors on prend la valeur précédente
            req.body.hasOwnProperty('firstName') && (Events.firstName = req.body.firstName)
            req.body.hasOwnProperty('lastName') && (Events.lastName = req.body.lastName)
            req.body.hasOwnProperty('birthday') && (Events.birthday = req.body.birthday)
            req.body.hasOwnProperty('mail') && (Events.mail = req.body.mail)
            req.body.hasOwnProperty('role') && (Events.role = req.body.role)
            
            Events.save(function (err, newEvents) {
                if (err) {
                    return res.send(err);
                } else {
                    res.json(newEvents)
                }
            })
        }
    })
}

/**
 * Routes liées aux id
 */
// Récupération d'un utilisateur par id
exports.getEventsById = async (req, res) => {
    db.Event.findById(req.params.id).then(function (Events) {
        res.send(Events)
    })
}

// Suppression d'un utilisateur par id
exports.deleteEventsById = function (req, res) {
    db.Event.deleteOne({
        _id: req.params.id
    }, function (err) {
        if (err) {
            return res.send(err);
        }
        res.json({
            message: "Events deleted"
        })
    })
}

/**
 * Données récupéré via l'email
 */
// Récupération d'un utilisateur par mail
exports.getEventsByMail = async (req, res) => {
    db.Event.findOne({
        $or: [{
            mail: req.params.mail
        },]
    },
        function (err, Events) {
            if (err) {
                return res.send(err);
            }
            res.send(Events)
        })
}

/**
 * Données récupérées via le nom ou prénom
 */
// Récupération d'utilisateurs via nom ou prénom
exports.getEventsByName = async (req, res) => {
    db.Event.find({
        $or: [{
            firstname: new RegExp(req.params.name, "i")
        },
        {
            lastname: new RegExp(req.params.name, "i")
        }
        ]
    },
        function (err, events) {
            if (err) {
                return res.send(err);
            }
            res.send(events)
        })
}

// Connexion de l'utilisateur grâce au login et mot de passe

exports.connectEvents = async (req, res) => {
    db.Event.findOne({
        $or: [{
            mail: req.params.mail
        },]
    },
        function (err, Events) {
            if (err) {
                return res.send(err);
            }
            else {
                if(Events != undefined){
                    const validPassword = bcrypt.compare(req.params.password, Events.password);
                    validPassword.then((result) => {
                        if(result){
                            console.log("Acces granted : Valid password")
                            res.send(Events)
                        }
                        else {
                            console.log("Access denied : Invalid password")
                            res.send("Access denied : Invalid password")
                        }
                    }).catch((error) => {
                        console.log("Error", error);
                        res.send(err);

                    })
                }
                else {
                    console.log("Access denied : User not found")
                    res.send("Access denied : User not found")
                }
            }
        })
        
}