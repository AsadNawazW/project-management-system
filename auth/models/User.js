const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
    role: { type: mongoose.Types.ObjectId, ref: 'Role' },    
});

userSchema.plugin(mongoosePaginate);
  
module.exports = mongoose.model("user", userSchema);
 