import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

mongoose.set('strictQuery', true);

const openMongooseConnection = async () => {
  mongoose
    .connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
      console.log('Connected to database !');
    })
    .catch((err) => console.log(err));
};

const openMongooseTestConnection = async () => {
  mongoose
    .connect(process.env.DB_TEST_URL, { useUnifiedTopology: true, useNewUrlParser: true })

    .catch((err) => console.log(err));
};

export { openMongooseConnection, openMongooseTestConnection };
