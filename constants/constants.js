const {
  DB_ADRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  PORT = 3000,
  JWT_SECRET,
  NODE_ENV,
} = process.env;

const userNotFoundMessage = 'Пользователь не найден.';
const validationErrorMessage = 'Переданы некорректные данные.';
const conflictErrorMessage = 'Пользователь с такой электронной почтой уже существует.';
const movieNotFoundMessage = 'Фильм не найден.';
const forbiddenErrorMessage = 'Чужие фильмы удалять нельзя.';
const serverErrorMessage = 'На сервере произошла ошибка';

module.exports = {
  DB_ADRESS,
  PORT,
  JWT_SECRET,
  NODE_ENV,
  userNotFoundMessage,
  validationErrorMessage,
  conflictErrorMessage,
  movieNotFoundMessage,
  forbiddenErrorMessage,
  serverErrorMessage,
};
