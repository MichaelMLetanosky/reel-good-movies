const router = require('express').Router();
const { User, Movie, Review, UserMovie, FollowedUser } = require('../models');
const withAuth = require('../utils/auth');


// add the withAuth when we have it properly set up
//const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:username', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.params.username},
      include: [{ model: Review }, { model: Movie }, { model: User, as: 'followee' }]
    });

    const dashboard = userData.get({ plain: true });

    // res.status(200).json(dashboard)
    res.render('userprofile', { ...dashboard });
  } catch (err) {
    res.status(500).json(err);
  }
});
  
/*
--------------GALLERY EXAMPLE
  try {
    const dbGalleryData = await Gallery.findAll({
      include: [
        {
          model: Painting,
          attributes: ['filename', 'description'],
        },
      ],
    });

    const galleries = dbGalleryData.map((gallery) =>
      gallery.get({ plain: true })
    );

    res.render('homepage', {
      galleries,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
*/


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;

