const router = require('express').Router();

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const signoutRoute = require('./signout');
const signinRoute = require('./signin');
const signupRoute = require('./signup');

const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use('/signin', signinRoute);
router.use('/signup', signupRoute);

router.use(auth);
router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);
router.use('/signout', signoutRoute);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Такого пути не существует.'));
});

module.exports = router;
