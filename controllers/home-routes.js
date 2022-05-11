const router = require('express').Router();
const { User, Movie, Review, UserMovie, FollowedUser } = require('../models');
const withAuth = require('../utils/auth');


// add the withAuth when we have it properly set up
//const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {

    if (req.session.loggedIn) {
      res.redirect(`/username/${req.session.user}`);
      return;
    }
    res.render('homepage', {loggedIn: req.session.loggedIn});

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    // if (req.session.loggedIn) {
    //   res.redirect('/');
    //   return;
    // }
  
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/username/:username', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.params.username},
      include: [{ model: Review, include: [{ model: Movie}, { model: User }] }, { model: Movie }, { model: User, as: 'followee' }]
    });

    const dashboard = userData.get({ plain: true });

    // res.status(200).json(dashboard)
    res.render('userprofile', { ...dashboard, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});
  
module.exports = router;