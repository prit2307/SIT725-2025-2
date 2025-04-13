const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/userModel');
const { expect } = require('chai');

// Set a test timeout
describe('User API Tests', function () {
  this.timeout(10000);

  before(async () => {
  
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect("mongodb://localhost:27017/users", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it('should create a new user via POST /submit', async () => {
    const res = await request(app)
      .post('/submit')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: '123456'
      });

    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.equal('User saved successfully!');
  });

  it('should get projects via GET /api/projects', async () => {
    const res = await request(app).get('/api/projects');

    expect(res.statusCode).to.equal(200);
    expect(res.body.data).to.be.an('array');
    expect(res.body.data.length).to.be.greaterThan(0);
  });
});
