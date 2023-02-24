import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import User from '../models/User.js';
import * as dotenv from 'dotenv';

dotenv.config();

async function auth(req, res, next) {
  if (req.token && req.userId && req.isAuth) next();
  const auth = req.get('Authorization');
  if (!auth) {
    req.isAuth = false;
    return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Not Authorized!' });
  }
  const token = auth.split(' ')[1];
  if (!token) {
    req.isAuth = false;
    return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Not Authorized!' });
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    req.isAuth = false;
    return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Not Authorized!' });
  }
  if (!decodedToken) {
    req.isAuth = false;
    return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Not Authorized!' });
  }

  let user;

  try {
    user = await User.findById(decodedToken.userId);
  } catch (err) {
    req.isAuth = false;
    return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Not Authorized!' });
  }

  req.userId = user._id;
  req.isAuth = true;
  next();
}

export default auth;
