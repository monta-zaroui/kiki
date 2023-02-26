import bcrypt from 'bcryptjs';
import User from '../../models/User.js';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Get one User by id.
 * @param id
 * @returns {User}
 */
const get = async (id) => {
  return await User.findById(id);
};

/**
 * Get User list.
 * @param skip
 * @param limit
 * @returns {User[]}
 */
const list = async (skip = 0, limit = 50) => {
  return await User.find().skip(+skip).limit(+limit);
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
  const savedUser = new User(user);
  savedUser.email = savedUser.email.trim().toLowerCase();
  savedUser.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(10));
  return await savedUser.save();
};

/**
 * Delete user
 * @param id
 * @returns {User}
 */
const remove = async (id) => {
  return await User.findByIdAndDelete(id);
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
 * Update favorite beers
 * @param userId
 * @param beers
 * @return {User}
 */
const updateFavoriteBeers = async (userId, beers) => {
  const user = await User.findById(userId);
  user.favoriteBeers = beers;
  return await user.save();
};

export default { get, list, create, remove, login, updateFavoriteBeers };
