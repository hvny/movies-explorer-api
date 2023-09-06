const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден.'));
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  const owner = req.user._id;

  User.findByIdAndUpdate(
    owner,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные.');
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password, name } = req.body;

  return User.findUserByCredentials({ email, password, name })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, { httpOnly: true, sameSite: true, maxAge: 3600000 * 24 * 7 });
      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email, password: hash, name,
      })
        .then(() => res.status(200).send({
          data: {
            email, name,
          },
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с такой электронной почтой уже существует.'));
            return;
          }
          if (err.name === 'ValidationError') {
            next(new ValidationError('Переданы некорретные данные.'));
            return;
          }
          next(err);
        });
    })
    .catch(next);
};
