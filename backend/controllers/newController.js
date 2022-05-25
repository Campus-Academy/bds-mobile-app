const db = require("../models/index.js");
const mongoose = require("mongoose");

/**
 * Toute les requetes disponibles pour l'url '/News'
 */

// Récupération de tous les newss
exports.getAllNews = async (req, res) => {
  db.News.find({}).exec(function (err, news) {
    if (err) {
      return res.send(err);
    }
    res.json(news);
  });
};

exports.getAllNewsWithAuthor = async (req, res) => {
  db.News.aggregate([
    {
      $lookup: {
        from: "User",
        foreignField: "_id",
        localField: "author",
        as: "authorDetails",
      },
    },
  ]).exec(function (err, news) {
    if (err) {
      return res.send(err);
    }
    res.json(news);
  });
};

// Création d'un news
exports.createNew = async (req, res) => {
  const New = new db.News({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    content: req.body.content,
    date: req.body.date,
    author: req.body.author,
  });
  New.save(function (err) {
    if (err) {
      return res.send(err);
    } else {
      return res.json(New);
    }
  });
};

//Modification d'un news
exports.updateNew = async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  var id = new mongoose.Types.ObjectId(req.params.id);
  db.News.findById(id, function (err, news) {
    if (err) {
      return res.send(err);
    } else {
      console.log(news);
      //Si le champs n'est pas renseigné alors on prend la valeur précédente
      req.body.hasOwnProperty("title") && (news.title = req.body.title);
      req.body.hasOwnProperty("content") && (news.content = req.body.content);
      req.body.hasOwnProperty("date") && (news.date = req.body.date);
      req.body.hasOwnProperty("author") && (news.author = req.body.author);
      req.body.hasOwnProperty("modificationDate") &&
        (news.modificationDate = req.body.modificationDate);
      req.body.hasOwnProperty("modificationAuthor") &&
        (news.modificationAuthor = req.body.modificationAuthor);

      news.save(function (err, newNew) {
        if (err) {
          return res.send(err);
        } else {
          console.log(newNew);
          res.json(newNew);
        }
      });
    }
  });
};

/**
 * Routes liées aux id
 */
// Récupération d'un news par id
exports.getNewsById = async (req, res) => {
  var id = new mongoose.Types.ObjectId(req.params.id);
  db.News.findById(id).exec(function (err, news) {
    if (err) {
      res.status(400).json("Error: " + err);
      return res.send(err);
    } else {
      console.log("The news ", news);
      res.send(news);
    }
  });
};

// Suppression d'un news par id
exports.deleteNewById = function (req, res) {
  console.log(req.params);
  db.News.deleteOne(
    {
      _id: req.params.id,
    },
    function (err) {
      if (err) {
        return res.send(err);
      }
      res.json({
        message: "New deleted",
      });
    }
  );
};

// Suppression d'un news par id
exports.deleteAll = function (req, res) {
  db.News.remove({}, function (err) {
    if (err) {
      return res.send(err);
    }
    res.json({
      message: "All news deleted",
    });
  });
};

// Récupération d'newss via le titre
exports.getNewByTitle = async (req, res) => {
  db.News.find(
    {
      title: new RegExp(req.params.title, "i"),
    },
    function (err, event) {
      if (err) {
        return res.send(err);
      }
      res.send(event);
    }
  );
};
