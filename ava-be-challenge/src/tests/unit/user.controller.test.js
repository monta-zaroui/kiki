import chai from 'chai';
import { after, before, describe } from 'mocha';
import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { openMongooseTestConnection } from '../../database/mongoose.js';
import User from '../../models/User.js';
import userController from '../../modules/user/user.controller.js';

const { expect } = chai;
chai.config.includeStack = true;

const user = new User({
  _id: faker.database.mongodbObjectId(),
  username: faker.name.middleName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  favoriteBeers: [1, 2, 3]
});

before(async () => {
  await openMongooseTestConnection();
});
after(async () => {
  await mongoose.disconnect();
});

describe('User controller unit tests', () => {
  it('should be created correctly', async () => {
    const createdUser = await userController.create(user);
    expect(createdUser.username).to.equal(user.username);
    expect(createdUser.email).to.equal(user.email.trim().toLowerCase());
    expect(createdUser.favoriteBeers.length).to.equal(user.favoriteBeers.length);
    const match = await bcrypt.compare(user.password, createdUser.password);
    expect(match).to.equal(true);
  });

  it('should find one User correctly', async () => {
    const foundUser = await userController.get(user._id);
    expect(foundUser.username).to.equal(user.username);
    expect(foundUser.email).to.equal(user.email.trim().toLowerCase());
    expect(foundUser.favoriteBeers.length).to.equal(user.favoriteBeers.length);
  });

  it('should find all Users correctly', async () => {
    const data = await userController.list();
    expect(data).to.be.an('array');
  });

  it('should login correctly', async () => {
    const data = await userController.login(user.email, user.password);
    expect(data).to.be.an('object');
    expect(data.token).to.be.a('string');
    expect(data.user).to.be.an('object');
    expect(data.user.username).to.equal(user.username);
    expect(data.user.email).to.equal(user.email.trim().toLowerCase());
    expect(data.user.favoriteBeers.length).to.equal(user.favoriteBeers.length);
  });

  it('should delete one User correctly', async () => {
    const deletedUser = await userController.remove(user._id);
    expect(deletedUser.username).to.equal(user.username);
    expect(deletedUser.email).to.equal(user.email.trim().toLowerCase());
    expect(deletedUser.favoriteBeers.length).to.equal(user.favoriteBeers.length);

    try {
      await userController.get(user._id);
    } catch (e) {
      expect(e).to.exist;
    }
  });
});
