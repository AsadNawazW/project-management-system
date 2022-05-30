const mongoose = require("mongoose");


const rolePermissionSchema = new mongoose.Schema({
    role: { type: mongoose.Types.ObjectId, ref: 'Role' },
    permission: { type: mongoose.Types.ObjectId, ref: 'Permission' },
});

module.exports = mongoose.model("role_permission", rolePermissionSchema);
 