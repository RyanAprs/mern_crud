// import { Sequelize } from "sequelize";
// import db from "../config/Connect.js";

// const { DataTypes } = Sequelize;

// const Users = db.define('users', {
//     username: {
//         type: DataTypes.STRING
//     },
//     email: {
//         type: DataTypes.STRING
//     },
//     password: {
//         type: DataTypes.STRING
//     },
//     refresh_token: {
//         type: DataTypes.STRING
//     },
// },{
//     freezeTableName: true
// })

const mongoose = require ("mongoose");
const bcrypt = require ("bcrypt");
const validator = require ("validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
)


// static signup method
UserSchema.statics.signup = async function(username, email, password) {

  // validation
  if (!username || !email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (password.length < 6) {
    throw Error('You must field at least 6 characters')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ username, email, password: hash })

  return user
}

// static login method
UserSchema.statics.login = async function(email, password) {

    // validation
    if (!email || !password) {
      throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
      throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      throw Error('Incorrect password')
    }

    return user
}


module.exports = mongoose.model("User", UserSchema);