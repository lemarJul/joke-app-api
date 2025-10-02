/**
 * @swagger
 * components:
 *   schemas:
 *     Joke:
 *       type: object
 *       required:
 *         - setup
 *         - punchline
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré de la blague
 *           uniqueItems: true
 *           example: 1
 *         setup:
 *           type: string
 *           description: La question de la blague
 *           example: Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?
 *         punchline:
 *           type: string
 *           description: La réponse de la blague
 *           example: Parce que sinon ils tombent dans le bateau.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création
 *           example: 2025-01-10T15:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière mise à jour
 *           example: 2025-01-10T15:00:00.000Z
 */
module.exports = (sequelize, DataTypes) =>
  sequelize.define("Joke", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    setup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    punchline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // createdAt and updatedAt are managed by Sequelize automatically
  });
