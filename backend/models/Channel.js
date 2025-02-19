const mongoose = require('mongoose');
const { Schema } = mongoose;

const channelSchema = new Schema(
  {
    // Optional name for group channels; can be left blank for direct messages
    name: {
      type: String,
      trim: true,
    },
    // List of participant user IDs
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    // A type field to distinguish between direct, group, classroom chats, etc.
    type: {
      type: String,
      enum: ['direct', 'group', 'classroom'],
      required: true,
      default: 'direct',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Channel', channelSchema);
