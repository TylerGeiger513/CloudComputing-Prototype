const Channel = require('../models/Channel');
const Message = require('../models/Message');

// Create or retrieve a direct channel between two users
exports.getOrCreateDirectChannel = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const { recipientId } = req.body;
    if (!recipientId) {
      return res.status(400).json({ message: 'Recipient ID is required.' });
    }
    
    // Look for a channel that is 'direct' with exactly these two participants
    let channel = await Channel.findOne({
      type: 'direct',
      participants: { $all: [userId, recipientId], $size: 2 }
    });
    
    if (!channel) {
      channel = new Channel({
        type: 'direct',
        participants: [userId, recipientId]
      });
      await channel.save();
    }
    
    res.status(200).json({ channel });
  } catch (error) {
    next(error);
  }
};

// Send a message in a channel
exports.sendMessage = async (req, res, next) => {
  try {
    const senderId = req.session.userId;
    const { channelId, content } = req.body;
    
    if (!channelId || !content) {
      return res.status(400).json({ message: 'Channel and content are required.' });
    }
    
    // Ensure the user is part of the channel
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found.' });
    }
    if (!channel.participants.includes(senderId)) {
      return res.status(403).json({ message: 'Not authorized to send messages in this channel.' });
    }
    
    const message = new Message({
      channel: channelId,
      sender: senderId,
      content,
    });
    await message.save();
    
    res.status(201).json({ message: 'Message sent.', data: message });
  } catch (error) {
    next(error);
  }
};

// Retrieve all messages for a channel (sorted chronologically)
exports.getMessages = async (req, res, next) => {
  try {
    const { channelId } = req.params;
    const messages = await Message.find({ channel: channelId }).sort({ createdAt: 1 });
    res.status(200).json({ messages });
  } catch (error) {
    next(error);
  }
};
