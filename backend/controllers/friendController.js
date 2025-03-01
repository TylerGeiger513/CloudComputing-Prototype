const User = require('../models/User');
const FriendRequest = require('../models/FriendRequest');

// Send a friend request (POST /api/friends/request)
// Now accepts a field 'recipient' which can be a username or user ID.
exports.sendFriendRequest = async (req, res, next) => {
  try {
    const requesterId = req.session.userId;
    const { recipient } = req.body; // recipient can be a username or an ObjectId

    if (!recipient) {
      return res.status(400).json({ message: 'Recipient username or ID is required.' });
    }

    // Determine whether recipient is a valid ObjectId (24 hex characters) or a username.
    let recipientUser;
    if (recipient.match(/^[0-9a-fA-F]{24}$/)) {
      recipientUser = await User.findById(recipient);
    } else {
      recipientUser = await User.findOne({ username: recipient });
    }
    if (!recipientUser) {
      return res.status(404).json({ message: 'Recipient user not found.' });
    }

    // Prevent sending a friend request to yourself.
    if (requesterId === recipientUser._id.toString()) {
      return res.status(400).json({ message: 'You cannot send a friend request to yourself.' });
    }

    // Check if a friend request already exists.
    const existingRequest = await FriendRequest.findOne({
      requester: requesterId,
      recipient: recipientUser._id,
    });
    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already sent.' });
    }

    // Check if the users are already friends.
    const requester = await User.findById(requesterId);
    if (requester.friends.includes(recipientUser._id)) {
      return res.status(400).json({ message: 'User is already your friend.' });
    }

    const friendRequest = new FriendRequest({
      requester: requesterId,
      recipient: recipientUser._id,
    });
    await friendRequest.save();

    res.status(201).json({ message: 'Friend request sent successfully.' });
  } catch (error) {
    next(error);
  }
};

// Accept a friend request (POST /api/friends/accept)
exports.acceptFriendRequest = async (req, res, next) => {
  try {
    const recipientId = req.session.userId;
    const { requestId } = req.body;
    if (!requestId) {
      return res.status(400).json({ message: 'Friend request ID is required.' });
    }

    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found.' });
    }
    if (friendRequest.recipient.toString() !== recipientId) {
      return res.status(403).json({ message: 'You are not authorized to accept this friend request.' });
    }

    // Add each user to the other’s friend list.
    await User.findByIdAndUpdate(recipientId, { $addToSet: { friends: friendRequest.requester } });
    await User.findByIdAndUpdate(friendRequest.requester, { $addToSet: { friends: recipientId } });

    // Delete the friend request.
    await FriendRequest.findByIdAndDelete(requestId);

    res.status(200).json({ message: 'Friend request accepted.' });
  } catch (error) {
    next(error);
  }
};

// Decline a friend request (POST /api/friends/decline)
exports.declineFriendRequest = async (req, res, next) => {
  try {
    const recipientId = req.session.userId;
    const { requestId } = req.body;
    if (!requestId) {
      return res.status(400).json({ message: 'Friend request ID is required.' });
    }

    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found.' });
    }
    if (friendRequest.recipient.toString() !== recipientId) {
      return res.status(403).json({ message: 'You are not authorized to decline this friend request.' });
    }

    await FriendRequest.findByIdAndDelete(requestId);
    res.status(200).json({ message: 'Friend request declined.' });
  } catch (error) {
    next(error);
  }
};

// Revoke a friend request (POST /api/friends/revoke)
exports.revokeFriendRequest = async (req, res, next) => {
  try {
    const requesterId = req.session.userId;
    const { requestId } = req.body;
    if (!requestId) {
      return res.status(400).json({ message: 'Friend request ID is required.' });
    }

    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found.' });
    }
    if (friendRequest.requester.toString() !== requesterId) {
      return res.status(403).json({ message: 'You are not authorized to revoke this friend request.' });
    }

    await FriendRequest.findByIdAndDelete(requestId);
    res.status(200).json({ message: 'Friend request revoked.' });
  } catch (error) {
    next(error);
  }
};

// Remove a friend (POST /api/friends/remove)
exports.removeFriend = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const { friendId } = req.body;
    if (!friendId) {
      return res.status(400).json({ message: 'Friend ID is required.' });
    }

    await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });
    await User.findByIdAndUpdate(friendId, { $pull: { friends: userId } });

    res.status(200).json({ message: 'Friend removed successfully.' });
  } catch (error) {
    next(error);
  }
};

// Get incoming (pending) friend requests (GET /api/friends/requests)
exports.getFriendRequests = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const requests = await FriendRequest.find({ recipient: userId })
      .populate('requester', 'username email');
    res.status(200).json({ friendRequests: requests });
  } catch (error) {
    next(error);
  }
};

// Get a user's friend list (GET /api/friends/list)
exports.getFriendList = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const user = await User.findById(userId).populate('friends', 'username email');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ friends: user.friends });
  } catch (error) {
    next(error);
  }
};
