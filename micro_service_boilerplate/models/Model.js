import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const modelSchema = new mongoose.Schema({
  name: { type: String, default: null },
});

modelSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('model', modelSchema);
