const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const newUserData = await User.findOne({
      where: {
        email: req.body.email,
      }
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = newUserData.dataValues.username;
      req.session.userId = newUserData.dataValues.id;
      
      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log(req.body)
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      }
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    let requestUser = dbUserData.dataValues.username
    let requestUserId = dbUserData.dataValues.id

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = requestUser
      req.session.userId = requestUserId;

      console.log(req.session.loggedIn)

      res.status(200).json(dbUserData);

    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;
