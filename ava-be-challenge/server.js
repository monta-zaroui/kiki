import * as http from 'http';
import app from './src/app.js';

import * as dotenv from 'dotenv';

dotenv.config();

const server = http.createServer(app);

server.listen(process.env.PORT || 3000);
console.log(`Running on ${process.env.PORT || 3000} !`);
