import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new mongoose.Schema({
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  role: { type: mongoose.Types.ObjectId, ref: 'Role' },
});

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('user', userSchema);
