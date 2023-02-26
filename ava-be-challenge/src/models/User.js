import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  favoriteBeers: [
    {
      type: Number,
      default: []
    }
  ]
});

uniqueValidator.defaults.type = 'mongoose-unique-validator';
userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique.'} );

/**
 * @typedef User
 */
export default mongoose.model('User', userSchema);
