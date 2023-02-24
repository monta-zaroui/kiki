import Joi from 'joi';
import express from 'express';
import httpStatus from 'http-status';
import userController from './user.controller.js';

const postSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  favoriteBeers: Joi.array().items(Joi.number()).optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const router = express.Router();

/**
 * GET /users
 * @summary Get a list of users
 * @param {number} skip.query - Number of users to skip
 * @param {number} limit.query - Limit number of users to be returned
 * @return {[User]} 200
 */
router.get('/', async (req, res) => {
  try {
    const users = await userController.list(req.query.skip || 0, req.query.limit || 50);
    return res.status(httpStatus.OK).json(users);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
});

/**
 * GET /users/:id
 * @summary Get a user by id
 * @param {string} id.path.required - id of user to get
 * @return {User} 200
 */
router.get('/:id', async (req, res) => {
  try {
    const user = await userController.get(req.params.id);
    return res.status(httpStatus.OK).json(user);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
});

/**
 * POST /users
 * @summary Create a new user
 * @param {User} request.body.required - user to create
 * @return {User} 201
 */
router.post('/', async (req, res) => {
  const validation = postSchema.validate(req.body);
  if (validation['error']) return res.status(httpStatus.CONFLICT).json(validation.error.message);
  try {
    const user = await userController.create(req.body);
    return res.status(httpStatus.CREATED).json(user);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
});

/**
 * DELETE /users/:id
 * @summary Delete a user by id
 * @param {string} id.path.required - id of user to delete
 * @return {User} 200
 */
router.delete('/:id', async (req, res) => {
  try {
    const user = await userController.remove(req.params.id);
    return res.status(httpStatus.OK).json(user);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
});

/**
 * POST /users/login
 * @summary Login a user
 * @param {string} email.body.required - email of user to login
 * @param {string} password.body.required - password of user to login
 * @return {User} 200
 */
router.post('/login', async (req, res) => {
  const validation = loginSchema.validate(req.body);
  if (validation['error']) return res.status(httpStatus.CONFLICT).json(validation.error.message);
  try {
    const user = await userController.login(req.body.email, req.body.password);
    return res.status(httpStatus.OK).json(user);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
});
