const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const jwt = require("jsonwebtoken");
const configData = require("../../config/config");
const config = configData.getConfig();
const jwtKey = config.JWT_SECRET,
  jwtExpirySeconds = 172800;

class Auth {
  initSchema() {
    const schema = new Schema(
      {
        token: {
          type: String,
          required: true,
        },
        user: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "user",
        },
      },
      {
        timestamps: true,
        toJSON: {
          transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
          },
        },
      }
    );

    schema.statics.generateToken = async function (user) {
      // Create a new token with the user details
      try {
        const token = await jwt.sign(
          {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          },
          jwtKey,
          {
            algorithm: "HS256",
            expiresIn: jwtExpirySeconds,
          }
        );

        return token;
      } catch (e) {
        throw e;
      }
    };

    schema.statics.decodeToken = async function (token) {
      // Create a new token with the user details
      try {
        return await jwt.verify(token, jwtKey);
      } catch (e) {
        throw e;
      }
    };
    // schema.set("toJSON", { virtuals: true });

    try {
      mongoose.model("auth", schema);
    } catch (e) {}
  }

  getInstance() {
    this.initSchema();
    return mongoose.model("auth");
  }
}

module.exports = { Auth };
