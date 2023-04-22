const { Schema, Types, model } = require('mongoose');


// reaction
const reactionSchema = new Schema({
    // reactionId - mongoose ObjectID data type, default value is set to new ObjectID
    reactionId: {
        type: Schema.Types.ObjectId,
        default: Types.ObjectId
    },
    // reactionBody - String, required, 280 char max.
    reactionBody:{
        type: String,
        required: true,
        maxlength: 280
    },
    // username - String, required
    userName:{
        type: String,
        required: true
    },
    // createdAt - Date, set default to current timestamp, use getter method to format the timestamp on query
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const thoughtSchema = new Schema(
    {
        // thoughtText - string, required, must be between 1 and 280 chars
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        // createdAt - date, set default value to current timestamp, use a getter method to format the timestamp on query
        createdAt: {
            type: Date,
            default: Date.now
        },
        // username - (the user that created this thought) - string, required
        userName: {
            type: String,
            required: true,
        },
        // reactions - (these are like replies) - string, required
        reaction:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Reaction',
            },
        ],
        reactions: [reactionSchema]
    }
);
// Schema settings - create a virtual called reactionCount that retrieves the length of the thoughts reactions array field on query
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reaction.length;
});


const Thought = model('Thought', thoughtSchema);
module.exports = Thought;