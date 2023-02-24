import express from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const URL = process.env.PUNK_API_URL;

/**
 * GET /v2/beers
 * @summary Get a list of beers
 * @return {[Beer]} 200
 */
router.get('/', async (req, res) => {
  const response = await axios.get(URL, {
    params: {
      ...req.query
    }
  });
  return res.status(response.status).json(response.data);
});

/**
 * GET /v2/beers/:id
 * @summary Get a beer by id
 * @param {number} id.path.required - id of beer to get
 * @return {Beer} 200
 */
router.get('/:id', async (req, res) => {
  const response = await axios.get(`${URL}/${req.params.id}`);
  return res.status(response.status).json(response.data);
});

export default router;
