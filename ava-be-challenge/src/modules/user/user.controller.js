import bcrypt from 'bcryptjs';
import User from '../../models/User.js';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

/**
 * Get one User by id.
 * @param id
 * @returns {User}
 */
const get = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    throw error;
  }
};

/**
 * Get User list.
 * @param skip
 * @param limit
 * @returns {User[]}
 */
const list = async (skip = 0, limit = 50) => {
  try {
    return await User.find().skip(+skip).limit(+limit);
  } catch (error) {
    throw error;
  }
};

/**
 * Create new user
 * @param user
 * @property {String} user.username
 * @property {String} user.email
 * @property {String} user.password
 * @property {[number]} user.favoriteBeers
 * @returns {User}
 */
const create = async (user) => {
  try {
    const savedUser = new User(user);
    savedUser.email = savedUser.email.trim().toLowerCase();
    savedUser.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(10));
    return await savedUser.save();
  } catch (error) {
    throw error;
  }
};

/**
 * Delete user
 * @param id
 * @returns {User}
 */
const remove = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

/**
 * Login user
 * @param email
 * @param password
 * @returns {User, token}
 */
const login = async (email, password) => {
  const user = await User.findOne({ email: email.trim().toLowerCase() });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error('Wrong password');

  const token = await jwt.sign(
    {
      userId: user._id.toString()
    },
    process.env.JWT_SECRET
  );
  return { user, token };
};

/**
 * Get favorite beers
 * @param userId
 * @return {[Beer]}
 */
const getFavoriteBeers = async (userId) => {
  const user = await User.findById(userId);
  const requests = user.favoriteBeers.map((id) => axios.get(`${URL}/${id}`));
  const response = await axios.all(requests);
  return response.map((r) => r.data);
};

export default { get, list, create, remove, login, getFavoriteBeers };
