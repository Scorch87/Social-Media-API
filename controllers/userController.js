const { ObjectId } = require('mongoose').Types;
const {User, Thought } = require('../models');
const mongoose = require('mongoose');

module.exports = {
    // get all users (GET)
    async getUsers(req, res){
        try{
            const users = await User.find();
            res.json(users);
        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    },
    // get a single user (GET)
    async getSingleUser(req, res){
        try{
            const user = await User.findOne({ _id: req.params.userID }).select('-__v');
            
            if(!user){
                return res.status(404).json({message:`No user with id: ${_id}`})
            }
            res.json({user})
        }catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // create a user (POST)
    async createUser(req, res){
        try{
            const user = await User.create(req.body);
            res.json(user);
        }catch (err){
            console.log(err);
            res.status(500).json(err); 
        }
    },
    // update a user (PUT)
    async updateUser(req, res){
        try{
            const user = await User.findOneAndUpdate(
                {_id: req.params.userID},
                {$set: req.body},
                {runValidators: true, new: true}
            );

            if(!user){
                res.status(404).json({message:'No user with this id!'});
            }

            res.json(user);
        }catch(err){
            console.error(err);
            res.status(500).json(err);
        }
    },

    // delete a user (DELETE)
    async deleteUser(req, res){
        try{
            const user = await User.findOneAndRemove({_id: req.params.userID}); 
            
            if(!user){
                return res.status(404).json({message:`No user with _id: ${req.params.userID}`});
            }
            
            console.log(`Deleting user with id ${req.params.userID}...`);
            // await Thought.deleteMany({_id: {$in: user.thoughts}});
            res.json({message:`\n${user}User deleted successfully`}); //add return?
            // res.json({message: 'User and thoughts deleted!'});
        }catch(err){
            console.error(err);
            return res.status(500).json(err);
        }
    },

    // add friend
    async addFriend(req, res){
        console.log(`You are adding a friend!`);
        console.log(req.body);
        try{
            const user = await User.findOneAndUpdate(
                { _id: req.params.userID },
                { $push: {friends: req.body.friendID }}
                );
            if (!user){
                return res.status(404).json({message:`No user with _id: ${req.params.userID}`})
            }
            // user.friends.push(req.body.friendID);
            // await user.save();
            res.status(200).json(user);
            
        }catch (err){
            res.status(500).json(err);
        }
    },

    // remove friend
    async removeFriend(req, res){
        console.log(`You are removing a friend!`);
        console.log(req.body);
        try{
            const user = await User.updateOne(
                { _id: req.params.userID },
                { $pull: {friends: req.body.friendID }}
            );
            if(!user){
                return res.status(404).json({message:`No user with _id: ${req.params.userID}`})
            }
            res.status(200).json(user);
        }catch(err){
            res.status(500).json(err);
        }
    }
};