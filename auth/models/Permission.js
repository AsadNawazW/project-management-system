const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
    name: { type: String, default: null },
});

module.exports = mongoose.model("permission", permissionSchema);
