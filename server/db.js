const { Sequelize, Model, STRING, INTEGER } = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/movies');

class Movie extends Model{};
Movie.init({
  title: {
    type: STRING,
    allowNull: false
  },
  numOfStars: {
    type: INTEGER,
    defaultValue: 3,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
}, { sequelize: db, modelName: 'movies', timestamps: false });

const syncAndSeed = async() => {
  await db.sync({ force: true });
}

module.exports = {
  db,
  Movie,
  syncAndSeed
}
