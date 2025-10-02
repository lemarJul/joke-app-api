const jokeController = require("../../controllers/joke.controller");
const express = require("express");
const router = express.Router();

router.get("/", jokeController.getAllJokes);
router.get("/random", jokeController.getRandomJoke);
router.get("/:id", jokeController.getJokeById);
router.post("/", jokeController.createJoke);

module.exports = router;
