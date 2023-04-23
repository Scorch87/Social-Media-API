const { User, Thought} = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res){
        try{
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        }catch(err){
            res.status(500).json(err);
        }
    },

    // Get a single thought by its id
    async getSingleThought(req, res){
        console.log(`You are searching for thought ${req.params.thoughtID}`);
        try{
            const thought = await Thought.findOne({_id: req.params.thoughtID}).select('-__v');
            console.log(thought);
            if(!thought){
                return res.status(404).json({message:`No thought with this id: ${req.params.thoughtID}`});
            }
            res.json({thought});
        }catch(err){
            res.status(500).json(err);
        }
    },

    // Post to create a new thought (dont forget to push the created thought's id to the associated user's thoughts array)
    async createThought(req, res){
        console.log('You are posting a thought!');
        const {userID} = req.body;
        console.log(userID);
        const {username, thoughtText } = req.body;
        try{
            const newThought = new Thought({
                username,
                thoughtText,
            });
            const savedThought = await newThought.save();
            const user = await User.findById(userID);
            if(!user){
                console.error(`User with id ${userID} not found`);
                return res.status(404).json({error: `User not found`});
            }
            user.thoughts.push(savedThought._id);
            await user.save();
            res.status(200).json({
                message: 'Thought created and added to user thoughts array',
                thoughtID: savedThought._id,
            });
        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Delete a thought by its id
    async deleteThought(req, res){
        console.log('You are deleting a thought!');
        try{
            const thought = await Thought.findOneAndRemove({_id: req.params.thoughtID});

            if(!thought){
                return res.status(404).json({messge:`No thought with _id: ${req.params.thoughtID}`});
            }
            console.log(`Deleting thought with id ${req.params.thoughtID}`)
            res.json({message:`\n${thought} Thought deleted successfully`});
        }catch(err){
            res.status(500).json(err);
        }
    },
    
    // Post to create a new reaction stored in a single thought's reactions array
    async createReaction(req, res){
        console.log('You are posting a reaction!');
        const {thoughtID} = req.params;
        console.log(thoughtID);
        const {username, thoughtText} = req.body;
        try{
            const newReaction = new Thought({
                username,
                thoughtText,
            });
            const savedReaction = await newReaction.save();
            const thought = await Thought.findById(thoughtID);
            if(!thought){
                console.error(`Thought with this id ${thoughtID} not found`);
                return res.status(404).json({error:`Thought not found`});
            }
            thought.reaction.push(savedReaction._id);
            await thought.save();
            res.status(200).json({
                message:'Reaction created and added to thoughts reaction array',
                reactionId: savedReaction._id,
            });
        }catch(err){
            res.status(500).json(err);
        }
    },

    // Delete to pull and remove a reaction by reactionID
    async deleteReaction(req, res){
        console.log('You are removing a reaction!');
        console.log(req.body);
        try{
            const thought = await Thought.updateOne(
                {_id: req.params.thoughtID},
                {$pull: {reaction: req.body.reactionId }}
            );
            if(!thought){
                return res.status(404).json({message: `No thought with this _id: ${req.params.thoughtID}`});
            }
            res.status(200).json(thought);
        }catch(err){
            res.status(500).json(err);
        }
    },
}