const router = require('express').Router();
const{
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    createReaction,
    deleteReaction,

} = require('../../controllers/thoughtController.js');

// api/thoughts
router.route('/').get(getThoughts).post(createThought);

// api/thoughts/thoughtID
router.route('/:thoughtID').get(getSingleThought).delete(deleteThought);

// api/thoughts/thoughtID/reactions
router.route('/:thoughtID/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;