const db = require("../models/index.js");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Toute les requetes disponibles pour l'url '/users'
 */

// Récupération de tous les utilisateurs
exports.getAllNews = async (req, res) => {
    db.New.find({}).exec(function (err, news) {
            if (err) {
                return res.send(err);
            }
            res.json(news)
        })
}

// Création d'un utilisateur
exports.createNews = async ( req, res) => {
        console.log("Les infos des news ",req.body)
        const News = new db.New({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            mail: req.body.mail,
            password:  await hashThis(req.body.password),
            role: req.body.role
        })
        News.save(function (err) {
            if (err) {
                return res.send(err);
            } else {
                return res.json(News)
            }
        })
}

//Modification d'un utilisateur
exports.updateNews = async (req, res) => {
    db.New.findById(req.params.id, function (err, News) {
        if (err) {
            return res.send(err);
        } else {
            //Si le champs n'est pas renseigné alors on prend la valeur précédente
            req.body.hasOwnProperty('firstName') && (News.firstName = req.body.firstName)
            req.body.hasOwnProperty('lastName') && (News.lastName = req.body.lastName)
            req.body.hasOwnProperty('birthday') && (News.birthday = req.body.birthday)
            req.body.hasOwnProperty('mail') && (News.mail = req.body.mail)
            req.body.hasOwnProperty('role') && (News.role = req.body.role)
            
            News.save(function (err, newNews) {
                if (err) {
                    return res.send(err);
                } else {
                    res.json(newNews)
                }
            })
        }
    })
}

/**
 * Routes liées aux id
 */
// Récupération d'un utilisateur par id
exports.getNewsById = async (req, res) => {
    db.New.findById(req.params.id).then(function (News) {
        res.send(News)
    })
}

// Suppression d'un utilisateur par id
exports.deleteNewsById = function (req, res) {
    db.New.deleteOne({
        _id: req.params.id
    }, function (err) {
        if (err) {
            return res.send(err);
        }
        res.json({
            message: "News deleted"
        })
    })
}

/**
 * Données récupéré via l'email
 */
// Récupération d'un utilisateur par mail
exports.getNewsByMail = async (req, res) => {
    db.New.findOne({
        $or: [{
            mail: req.params.mail
        },]
    },
        function (err, News) {
            if (err) {
                return res.send(err);
            }
            res.send(News)
        })
}

/**
 * Données récupérées via le nom ou prénom
 */
// Récupération d'utilisateurs via nom ou prénom
exports.getNewsByName = async (req, res) => {
    db.New.find({
        $or: [{
            firstname: new RegExp(req.params.name, "i")
        },
        {
            lastname: new RegExp(req.params.name, "i")
        }
        ]
    },
        function (err, news) {
            if (err) {
                return res.send(err);
            }
            res.send(news)
        })
}

// Connexion de l'utilisateur grâce au login et mot de passe

exports.connectNews = async (req, res) => {
    db.New.findOne({
        $or: [{
            mail: req.params.mail
        },]
    },
        function (err, News) {
            if (err) {
                return res.send(err);
            }
            else {
                if(News != undefined){
                    const validPassword = bcrypt.compare(req.params.password, News.password);
                    validPassword.then((result) => {
                        if(result){
                            console.log("Acces granted : Valid password")
                            res.send(News)
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