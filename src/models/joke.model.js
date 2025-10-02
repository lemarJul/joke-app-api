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
