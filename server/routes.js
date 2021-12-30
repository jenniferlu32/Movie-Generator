const express = require('express');
const router = express.Router();
const { Movie } = require('./db');

router.get('/', async(req, res, next) => {
  try {
    const response = await Movie.findAll();
    res.send(response)
  } catch(err) {
    next(err);
  };
});

router.post('/', async(req, res, next) => {
  try {
    const movie = await Movie.create({ title: req.body.title });
    res.status(201).send(movie);
  } catch(err) {
    next(err);
  };
});

router.get('/:id', async(req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    res.send(movie);
  } catch(err) {
    next(err);
  };
});

router.delete('/:id', async(req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    await movie.destroy();
  } catch(err) {
    next(err)
  };
});

router.put('/:id', async(req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    movie.update({
      numOfStars: req.body.numOfStars
    })
    res.status(200).send(movie);
  } catch(err) {
    next(err);
  };
});


module.exports = router;
