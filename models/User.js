const { Schema, Types, model } = require('mongoose');
const mongoose = require('mongoose');

const userSchema = new Schema(
    {
        // username - string, unique, required, trimmed
        username: {
            type: String,
            required: true,
            unique: true, 
            index: true,
            trim: true
        },
        // email - string, required, unique, must match valid email address (look into Mongoose validation)
        email: {
            type: String,
            required: true,
            unique: true,
            validator: function(v){
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        // thoughts - array of _id values referencing the Thought model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        // friends - array of _id values referencing the User model (self reference)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        // thoughts:[thoughtSchema],
    },
    // {
    //     toJSON: {
    //         virtuals: true,
    //         getters: true,
    //     },
    //     // id: false,
    // }
);
// userSchema.methods.addFriend = function (friendID){
//     friends.push(friendID);
// }

// schema settings - create a virtual called friendCount that retrieves the length of the user's friends array
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

const User = model('user', userSchema);
module.exports = User;