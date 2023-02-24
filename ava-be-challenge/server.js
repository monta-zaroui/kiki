import * as http from 'http';
import app from './src/app.js';

import * as dotenv from 'dotenv';
import { openMongooseConnection } from './src/database/mongoose.js';

dotenv.config();

const server = http.createServer(app);

openMongooseConnection()
  .then(() => {
    server.listen(process.env.PORT || 3000);
    console.log(`Running on ${process.env.PORT || 3000} !`);
  })
  .catch((err) => console.log(err));

export default server;
