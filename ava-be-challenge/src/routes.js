import express from 'express';
import userRoutes from './modules/user/user.routes.js';
import beerRoutes from './modules/beer/beer.routes.js';

const router = express.Router();

/**
 * GET /v2/base/healthcheck - Check service health
 */
router.get('/base/healthcheck', (req, res) =>
  res.json({
    server_time: new Date().toISOString(),
    timezone: new Date().toLocaleString('en-US', { timeZoneName: 'short' }).split(' ').pop(),
    version: process.env.npm_package_version
  })
);

router.use('/users', userRoutes);
router.use('/beers', beerRoutes);

export default router;
