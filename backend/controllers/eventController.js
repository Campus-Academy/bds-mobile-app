const db = require("../models/index.js");
const mongoose = require("mongoose");

/**
 * Toutes les requetes disponibles pour l'url '/Events'
 */

// Récupération de tous les évenements
exports.getAllEvents = async (req, res) => {
  db.Event.find({}).exec(function (err, events) {
    if (err) {
      return res.send(err);
    }
    res.json(events);
  });
};

// Création d'un évenement
exports.getAllEventsWithAuthor = async (req, res) => {
  db.Event.aggregate([
    {
      $lookup: {
        from: "User",
        foreignField: "_id",
        localField: "author",
        as: "authorDetails",
      },
    },
  ]).exec(function (err, events) {
    if (err) {
      res.status(400).json("Error: " + err);
      return res.send(err);
    }
    res.json(events);
  });
};

// Création d'un évenement
exports.createEvent = async (req, res) => {
  const Event = new db.Event({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    capacity: req.body.capacity,
    place: req.body.place,
    date: req.body.date,
    price: req.body.price,
    modality: req.body.modality,
    creationDate: req.body.creationDate,
    author: req.body.author,
  });
  Event.save(function (err) {
    if (err) {
      res.status(400).json("Error: " + err);
      return res.send(err);
    } else {
      return res.json(Event);
    }
  });
};

//Modification d'un évenement
exports.updateEvent = async (req, res) => {
  db.Event.findById(req.params.id, function (err, Event) {
    if (err) {
      return res.send(err);
    } else {
      //Si le champs n'est pas renseigné alors on prend la valeur précédente
      req.body.hasOwnProperty("title") && (Event.title = req.body.title);
      req.body.hasOwnProperty("description") &&
        (Event.description = req.body.description);
      req.body.hasOwnProperty("capacity") &&
        (Event.capacity = req.body.capacity);
      req.body.hasOwnProperty("place") && (Event.place = req.body.place);
      req.body.hasOwnProperty("date") && (Event.date = req.body.date);
      req.body.hasOwnProperty("price") && (Event.price = req.body.price);
      req.body.hasOwnProperty("modality") &&
        (Event.modality = req.body.modality);
      req.body.hasOwnProperty("creationDate") &&
        (Event.creationDate = req.body.creationDate);
      req.body.hasOwnProperty("author") && (Event.author = req.body.author);

      Event.save(function (err, newEvent) {
        if (err) {
          res.status(400).json("Error: " + err);
          return res.send(err);
        } else {
          res.json(newEvent);
        }
      });
    }
  });
};

/**
 * Routes liées aux id
 */
// Récupération d'un évenement par id
exports.getEventById = async (req, res) => {
  db.Event.findById(req.params.id).then(function (Event) {
    res.send(Event);
  });
};

// Suppression d'un évenement par id
exports.deleteEventById = function (req, res) {
  db.Event.deleteOne(
    {
      _id: req.params.id,
    },
    function (err) {
      if (err) {
        res.status(400).json("Error: " + err);
        return res.send(err);
      }
      res.json({
        message: "Event deleted",
      });
    }
  );
};

// Récupération d'évenements via le titre
exports.getEventByTitle = async (req, res) => {
  db.Event.find(
    {
      title: new RegExp(req.params.title, "i"),
    },
    function (err, event) {
      if (err) {
        res.status(400).json("Error: " + err);
        return res.send(err);
      }
      res.send(event);
    }
  );
};
