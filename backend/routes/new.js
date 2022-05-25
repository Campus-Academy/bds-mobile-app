const express = require("express");
const router = express.Router();
const newController = require("../controllers/newController");

// sans parametre
router.get("/", newController.getAllNews);
router.get("/details", newController.getAllNewsWithAuthor);
router.post("/", newController.createNew);
router.put("/:id", newController.updateNew);

// par id
router.get("/:id", newController.getNewsById);
router.delete("/:id", newController.deleteNewById);
router.delete("/", newController.deleteAll);

// par titre
router.get("/title/:title", newController.getNewByTitle);

module.exports = router;
