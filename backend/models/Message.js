const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    // Reference to the channel this message belongs to
    channel: {
      type: Schema.Types.ObjectId,
      ref: 'Channel',
      required: true,
    },
    // The sender’s user ID
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // The actual message content
    content: {
      type: String,
      required: true,
    },
    // Optional list of user IDs that have read this message
    readBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
