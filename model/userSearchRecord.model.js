const mongoose = require("mongoose");

const userSearchRecordSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    diamond: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Diamond",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("UserSearchRecord", userSearchRecordSchema);
