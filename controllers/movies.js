const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

const {
  validationErrorMessage,
  movieNotFoundMessage,
  forbiddenErrorMessage,
} = require('../constants/constants');

module.exports.getAllMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(validationErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new NotFoundError(movieNotFoundMessage))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.deleteOne(movie)
          .then(() => res.send(movie))
          .catch(next);
      } else {
        next(new ForbiddenError(forbiddenErrorMessage));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(validationErrorMessage));
        return;
      }
      next(err);
    });
};
