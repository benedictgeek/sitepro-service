const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const jwt = require("jsonwebtoken");
const configData = require("../../config/config");
const config = configData.getConfig();

class Project {
  initSchema() {
    const schema = new Schema(
      {
        title: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    );

    try {
      mongoose.model("project", schema);
    } catch (e) {}
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("project");
  }
}

module.exports = { Project };
