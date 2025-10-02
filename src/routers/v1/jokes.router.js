const jokeController = require("../../controllers/joke.controller");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jokes
 *   description: API de gestion des blagues
 */

/**
 * @swagger
 * /jokes:
 *   get:
 *     summary: Récupère toutes les blagues
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/JokesList'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", jokeController.getAllJokes);

/**
 * @swagger
 * /jokes/random:
 *   get:
 *     summary: Récupère une blague aléatoire
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         $ref: '#/components/responses/RandomJoke'
 *       404:
 *         $ref: '#/components/responses/JokeNotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/random", jokeController.getRandomJoke);

/**
 * @swagger
 * /jokes/{id}:
 *   get:
 *     summary: Récupère une blague par son ID
 *     tags: [Jokes]
 *     parameters:
 *       - $ref: '#/components/parameters/JokeId'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/JokeById'
 *       404:
 *         $ref: '#/components/responses/JokeNotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:id", jokeController.getJokeById);

/**
 * @swagger
 * /jokes:
 *   post:
 *     summary: Crée une nouvelle blague
 *     tags: [Jokes]
 *     requestBody:
 *       $ref: '#/components/requestBodies/CreateJokeRequest'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/JokeCreated'
 *       400:
 *         $ref: '#/components/responses/MissingData'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/", jokeController.createJoke);

module.exports = router;
