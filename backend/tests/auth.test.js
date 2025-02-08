// tests/auth.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');

describe('Authentication Endpoints', () => {
  let server;
  let agent;
  const userData = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123'
  };

  beforeAll(async () => {
    // Connect to the test db
    await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/campusconnect_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    server = app.listen(4000);
    agent = request.agent(server);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    // Clear the User collection after each test
    await User.deleteMany({});
  });

  it('should sign up a new user', async () => {
    const res = await agent
      .post('/api/auth/signup')
      .send(userData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('userId');
  });

  it('should log in with valid credentials', async () => {
    // First, sign up the user
    await agent.post('/api/auth/signup').send(userData);
    // Log out to ensure a clean login flow if auto-login is implemented
    await agent.post('/api/auth/logout');
    
    const res = await agent
      .post('/api/auth/login')
      .send({
        username: userData.username,
        password: userData.password
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Logged in successfully');
  });

  it('should not delete the user with an incorrect password', async () => {
    // Sign up and log in the user
    await agent.post('/api/auth/signup').send(userData);
    
    const res = await agent
      .delete('/api/auth/delete')
      .send({ password: 'wrongpassword' });
      
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toBe('Incorrect password');
  });

  it('should delete the user with the correct password', async () => {
    // Sign up and log in the user
    await agent.post('/api/auth/signup').send(userData);
    
    // Delete the user with the correct password
    const res = await agent
      .delete('/api/auth/delete')
      .send({ password: userData.password });
      
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('User deleted successfully');
    
    // Confirm that the user cannot access the profile (i.e., session destroyed)
    const profileRes = await agent.get('/api/auth/profile');
    expect(profileRes.body.message).toBe('Not logged in');
    
    // Additionally, verify that the user is removed from the database
    const user = await User.findOne({ username: userData.username });
    expect(user).toBeNull();
  });
});
