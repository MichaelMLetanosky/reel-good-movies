const router = require('express').Router();
const { FollowedUser, User } = require('../../models');

// The `/api/follow` endpoint

router.post('/', async (req, res) => {
    try {
        console.log('finding user')
        const followeeData = await User.findOne({
            where: { username: req.body.followeeUsername }
        })
        console.log(followeeData)
        let followObject = {
            follower_id: req.session.userId,
            followee_id: followeeData.id
        }
        console.log(followObject)
        const followData = await FollowedUser.create(followObject);
        res.status(200).json(followData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;