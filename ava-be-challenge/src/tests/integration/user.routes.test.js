import httpStatus from 'http-status';
import chai from 'chai';
import { before, describe } from 'mocha';
import { faker } from '@faker-js/faker';
import initializeChai from '../chai.js';
import { openMongooseTestConnection } from '../../database/mongoose.js';
import app from '../../app.js';

initializeChai();

const { expect } = chai;
chai.config.includeStack = true;

const user = {
  username: faker.name.middleName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

before(async () => {
  await openMongooseTestConnection();
});

describe('User e2e tests', () => {
  /**
   * Test the POST /users route
   */
  it('should create a new user', async () => {
    const res = await chai.request(app).post('/v2/users').send(user);
    expect(res).to.have.status(httpStatus.CREATED);
    expect(res.body).to.be.an('object');
    expect(res.body.username).to.equal(user.username);
    expect(res.body.email).to.equal(user.email.trim().toLowerCase());
    expect(res.body.password).to.not.equal(user.password);
    user._id = res.body._id;
  });

  /**
   * Test the GET /users route
   */
  it('should get all users', async () => {
    const res = await chai.request(app).get('/v2/users');
    expect(res).to.have.status(httpStatus.OK);
    expect(res.body).to.be.an('array');
  });

  /**
   * Test the GET /users/:id route
   */
  it('should get one user', async () => {
    const res = await chai.request(app).get(`/v2/users/${user._id}`);
    expect(res).to.have.status(httpStatus.OK);
    expect(res.body).to.be.an('object');
    expect(res.body.username).to.equal(user.username);
    expect(res.body.email).to.equal(user.email.trim().toLowerCase());
  });

  /**
   * Test the POST /users/login route
   */
  it('should login a user', async () => {
    const res = await chai.request(app).post('/v2/users/login').send({
      email: user.email,
      password: user.password
    });
    expect(res).to.have.status(httpStatus.OK);
    expect(res.body).to.be.an('object');
    expect(res.body.token).to.be.a('string');
    expect(res.body.user).to.be.an('object');
  });

  /**
   * Test the DELETE /users/:id route
   */
  it('should delete a user', async () => {
    const res = await chai.request(app).delete(`/v2/users/${user._id}`);
    expect(res).to.have.status(httpStatus.OK);
    expect(res.body).to.be.an('object');
    expect(res.body.username).to.equal(user.username);
    expect(res.body.email).to.equal(user.email.trim().toLowerCase());
  });
});
