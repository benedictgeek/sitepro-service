const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const configData = require("../../config/config");
const config = configData.getConfig();

class ProjectParticipants {
  initSchema() {
    const schema = new Schema(
      {
        project: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "project",
        },
        title: {
          type: String,
        },
        email: {
          type: String,
          // unique: true,
          required: true,
        },
        user: {
          type: Schema.Types.ObjectId,
          required: false,
          ref: "user",
        },
        access: {
          type: String,
          enum: ["read", "comment", "edit", "full"],
          default: "read",
        },
        status: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
      { timestamps: true }
    );

    try {
      mongoose.model("projectParticipants", schema);
    } catch (e) {}
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("projectParticipants");
  }
}

module.exports = { ProjectParticipants };
