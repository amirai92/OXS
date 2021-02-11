const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: { createdAt: "created_at" } }
);
userSchema.plugin(uniqueValidator);

userSchema.methods.generateUserToken = async function () {
  const key =
    this.role === "admin" ? process.env.JWT_KEY_ADMIN : process.env.JWT_KEY;
  const token = jwt.sign({ id: this._id.toString() }, key, {
    expiresIn: "1h",
  });
  this.tokens = this.tokens.concat({ token });
  return token;
};
module.exports = mongoose.model("User", userSchema);
