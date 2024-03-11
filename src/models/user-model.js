const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true, // To make searching in MongoDB easy
    },

    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
  },

  {
    timstamps: true,
  }
);

// Encrypt password before saving

// Can also say its a middleware for mongoose

// UserSchema.pre("save", function (next) {
//   const user = this;
//   const salt = bcrypt.genSaltSync(9);
//   const encryptedPassword = bcrypt.hashSync(user.password, salt);
//   user.password = encryptedPassword;
//   next();
// });

// UserSchema.methods.comparePassword = function compare(password) {
//   const user = this;
//   console.log(password);
//   console.log(this.password);
//   return bcrypt.compareSync(password, user.password);
// };

// UserSchema.methods.genJWT = function generate() {
//   return jwt.sign(
//     {
//       id: this._id,
//       email: this.email,
//     },
//     "cobra_secret",
//     {
//       expiresIn: "2h",
//     }
//   );
// };

const User = mongoose.model("User", UserSchema);

module.exports = User;
