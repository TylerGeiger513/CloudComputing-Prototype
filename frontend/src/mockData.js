// src/mockData.js
export const testUser = {
    _id: 'test123',
    username: 'testUser',
    email: 'testuser@example.com',
    friends: [
      { _id: '1', username: 'John Doe', email: 'friend1@example.com' },
      { _id: '2', username: 'Bob Smith', email: 'friend2@example.com' },
    ],
  };
  
  export const mockFriendRequests = [
    { _id: '3', requester: { _id: '3', username: 'TestUser', email: 'friend3@example.com' } },
    { _id: '4', requester: { _id: '4', username: 'Tygg513', email: 'friend4@example.com' } },
  ];
  