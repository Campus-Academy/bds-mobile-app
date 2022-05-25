const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

// sans parametre
router.get("/", eventController.getAllEvents);
router.get("/details", eventController.getAllEventsWithAuthor);

router.post("/", eventController.createEvent);
router.put("/:id", eventController.updateEvent);

// par id
router.get("/:id", eventController.getEventById);
router.delete("/:id", eventController.deleteEventById);

// par titre
router.get("/title/:title", eventController.getEventByTitle);

module.exports = router;
