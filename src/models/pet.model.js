import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  age: {type: Number, required: true},
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  history: [{
    date_visit: {type: String},
    description: {type: String}
  }],
  vaccines: []

})

export const petModel = mongoose.model('Pet', petSchema)