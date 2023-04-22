const router = require('express').Router();
const{
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers).post(createUser);

// api/users/:userId
router.route('/:userID').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userID/friends/
router.route('/:userID/friends/').post(addFriend).delete(removeFriend);
module.exports = router;