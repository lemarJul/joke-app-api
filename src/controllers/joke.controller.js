const { Joke } = require("../db");
const { Sequelize } = require("sequelize");

/**
 * @swagger
 * components:
 *   requestBodies:
 *     CreateJokeRequest:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - setup
 *               - punchline
 *             properties:
 *               setup:
 *                 type: string
 *                 description: La question de la blague
 *                 example: Qu'est-ce qu'un crocodile qui surveille une ville ?
 *               punchline:
 *                 type: string
 *                 description: La réponse de la blague
 *                 example: Un Lacoste de sécurité !
 *   responses:
 *     JokesList:
 *       description: Liste de toutes les blagues
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *               data:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Joke'
 *               count:
 *                 type: integer
 *     JokeById:
 *       description: Blague trouvée
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *               data:
 *                 $ref: '#/components/schemas/Joke'
 *     JokeNotFound:
 *       description: Blague non trouvée
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: "Joke not found"
 *     RandomJoke:
 *       description: Blague aléatoire
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *               data:
 *                 $ref: '#/components/schemas/Joke'
 *     JokeCreated:
 *       description: Blague créée avec succès
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *               data:
 *                 $ref: '#/components/schemas/Joke'
 *     MissingData:
 *       description: Données manquantes ou invalides
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *                 example: "Setup and punchline are required"
 *     ServerError:
 *       description: Erreur serveur
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: false
 *               message:
 *                 type: string
 *               error:
 *                 type: string
 *   parameters:
 *     JokeId:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *       description: ID de la blague
 *       example: 1
 */
async function getAllJokes(req, res) {
  try {
    const jokes = await Joke.findAll();
    res.status(200).json({
      success: true,
      data: jokes,
      count: jokes.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching jokes",
      error: error.message,
    });
  }
}

async function getJokeById(req, res) {
  try {
    const { id } = req.params;
    const joke = await Joke.findByPk(parseInt(id));

    if (!joke) {
      return res.status(404).json({
        success: false,
        message: "Joke not found",
      });
    }

    res.status(200).json({
      success: true,
      data: joke,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching joke",
      error: error.message,
    });
  }
}

async function getRandomJoke(req, res) {
  try {
    const joke = await Joke.findOne({ order: Sequelize.literal("RANDOM()") });

    if (!joke) {
      return res.status(404).json({
        success: false,
        message: "No joke found",
      });
    }

    res.status(200).json({
      success: true,
      data: joke,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching random joke",
      error: error.message,
    });
  }
}

async function createJoke(req, res) {
  try {
    const { setup, punchline } = req.body;

    if (!setup || !punchline) {
      return res.status(400).json({
        success: false,
        message: "Setup and punchline are required",
      });
    }

    // Sanitize inputs
    const sanitizeInput = (input) => {
      const sanitized = input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
        .trim()
        .replace(/[<>]/g, "");
      console.log("Sanitized input:", sanitized);
      return sanitized;
    };

    const sanitized = {
      setup: sanitizeInput(setup),
      punchline: sanitizeInput(punchline),
    };

    // Check if inputs are empty after sanitization
    if (!sanitized.setup || !sanitized.punchline) {
      return res.status(400).json({
        success: false,
        message:
          "Setup and punchline cannot be empty or contain only dangerous characters",
      });
    }

    const newJoke = await Joke.create({
      setup: sanitized.setup,
      punchline: sanitized.punchline,
    });

    res.status(201).json({
      success: true,
      data: newJoke,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating joke",
      error: error.message,
    });
  }
}

module.exports = {
  getAllJokes,
  getJokeById,
  getRandomJoke,
  createJoke,
};
