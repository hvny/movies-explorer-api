require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { limiter } = require('./middlewares/limiter');

const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, DB_ADRESS } = require('./constants/constants');

const app = express();
mongoose.connect(DB_ADRESS);

app.use(cors({
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
    'http://api.hvny-diplom.students.nomoredomainsicu.ru',
    'https://api.hvny-diplom.students.nomoredomainsicu.ru'],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);
app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
