const router = require('express').Router();
const session = require('express-session');
const { User, Movie, Review } = require('../models');
const withAuth = require('../utils/auth');


// add the withAuth when we have it properly set up

router.get('/', async (req, res) => {
  console.log("hello")
  try {

    if (req.session.loggedIn) {
      res.redirect(`/username/${req.session.user}`);
      return;
    }
    res.render('homepage', { loggedIn: req.session.loggedIn });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/username/:username', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.params.username },
      include: [{ model: Review, include: [{ model: Movie }, { model: User }] }, { model: Movie }, { model: User, as: 'followee' }]
    });
    let differentUser = false
    const dashboard = userData.get({ plain: true });
    if (req.params.username !== req.session.user) {
      differentUser = true
    }
    console.log(differentUser)
    // res.status(200).json(dashboard)
    res.render('userprofile', { ...dashboard, differentUser, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;