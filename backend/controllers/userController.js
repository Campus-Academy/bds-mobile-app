const db = require("../models/index.js");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

 
async function hashThis(password){
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

/**
 * Toute les requetes disponibles pour l'url '/users'
 */

// Récupération de tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    db.User.find({}).exec(function (err, users) {
            if (err) {
                return res.send(err);
            }
            res.json(users)
        })
}

// Création d'un utilisateur
exports.createUser = async ( req, res) => {
        console.log("Les infos de l'user ",req.body)
        const User = new db.User({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            mail: req.body.mail,
            password:  await hashThis(req.body.password),
            role: req.body.role
        })
        User.save(function (err) {
            if (err) {
                return res.send(err);
            } else {
                return res.json(User)
            }
        })
}

//Modification d'un utilisateur
exports.updateUser = async (req, res) => {
    db.User.findById(req.params.id, function (err, User) {
        if (err) {
            return res.send(err);
        } else {
            //Si le champs n'est pas renseigné alors on prend la valeur précédente
            req.body.hasOwnProperty('firstName') && (User.firstName = req.body.firstName)
            req.body.hasOwnProperty('lastName') && (User.lastName = req.body.lastName)
            req.body.hasOwnProperty('birthday') && (User.birthday = req.body.birthday)
            req.body.hasOwnProperty('mail') && (User.mail = req.body.mail)
            req.body.hasOwnProperty('role') && (User.role = req.body.role)
            
            User.save(function (err, newUser) {
                if (err) {
                    return res.send(err);
                } else {
                    res.json(newUser)
                }
            })
        }
    })
}

/**
 * Routes liées aux id
 */
// Récupération d'un utilisateur par id
exports.getUserById = async (req, res) => {
    db.User.findById(req.params.id).then(function (User) {
        res.send(User)
    })
}

// Suppression d'un utilisateur par id
exports.deleteUserById = function (req, res) {
    db.User.deleteOne({
        _id: req.params.id
    }, function (err) {
        if (err) {
            return res.send(err);
        }
        res.json({
            message: "User deleted"
        })
    })
}

/**
 * Données récupéré via l'email
 */
// Récupération d'un utilisateur par mail
exports.getUserByMail = async (req, res) => {
    db.User.findOne({
        $or: [{
            mail: req.params.mail
        },]
    },
        function (err, User) {
            if (err) {
                return res.send(err);
            }
            res.send(User)
        })
}

/**
 * Données récupérées via le nom ou prénom
 */
// Récupération d'utilisateurs via nom ou prénom
exports.getUsersByName = async (req, res) => {
    db.User.find({
        $or: [{
            firstname: new RegExp(req.params.name, "i")
        },
        {
            lastname: new RegExp(req.params.name, "i")
        }
        ]
    },
        function (err, users) {
            if (err) {
                return res.send(err);
            }
            res.send(users)
        })
}

// Connexion de l'utilisateur grâce au login et mot de passe

exports.connectUser = async (req, res) => {
    db.User.findOne({
        $or: [{
            mail: req.params.mail
        },]
    },
        function (err, User) {
            if (err) {
                return res.send(err);
            }
            else {
                if(User != undefined){
                    const validPassword = bcrypt.compare(req.params.password, User.password);
                    validPassword.then((result) => {
                        if(result){
                            console.log("Acces granted : Valid password")
                            res.send(User)
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