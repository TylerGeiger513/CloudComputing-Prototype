// backend/controllers/friendController.js
const User = require('../models/User');
const FriendRequest = require('../models/friendRequest');

// Send a friend request (POST /api/friends/request)
exports.sendFriendRequest = async (req, res, next) => {
  try {
    const requesterId = req.session.userId;
    const { recipientId } = req.body;

    if (!recipientId) {
      return res.status(400).json({ message: 'Recipient ID is required.' });
    }
    if (requesterId === recipientId) {
      return res.status(400).json({ message: 'You cannot send a friend request to yourself.' });
    }

    // Ensure the recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient user not found.' });
    }

    // Check if a friend request already exists
    const existingRequest = await FriendRequest.findOne({
      requester: requesterId,
      recipient: recipientId,
    });
    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already sent.' });
    }

    // Check if the users are already friends
    const requester = await User.findById(requesterId);
    if (requester.friends.includes(recipientId)) {
      return res.status(400).json({ message: 'User is already your friend.' });
    }

    const friendRequest = new FriendRequest({
      requester: requesterId,
      recipient: recipientId,
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

    // Update friend lists for both users
    await User.findByIdAndUpdate(recipientId, { $addToSet: { friends: friendRequest.requester } });
    await User.findByIdAndUpdate(friendRequest.requester, { $addToSet: { friends: recipientId } });

    // Delete the friend request 
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

    // Delete the friend request
    await FriendRequest.findByIdAndDelete(requestId);
    res.status(200).json({ message: 'Friend request declined.' });
  } catch (error) {
    next(error);
  }
};

// (POST /api/friends/revoke)
// Allows the requester to cancel a pending friend request.
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

    // Remove friendId from the current user's friend list and vice versa.
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
