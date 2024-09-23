import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
})

export const userModel = mongoose.model('User', userSchema)