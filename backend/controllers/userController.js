const  User  = require ("../models/userModel")
const  jwt = require ("jsonwebtoken")

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {
        expiresIn: '1d'
    })
}

// signup a user
const signupUser = async (req, res) => {
    const {username, email, password} = req.body
  
    try {
      const user = await User.signup(username, email, password)
  
      // create a token
      const id = user._id
      const token = createToken(user._id)
  
      res.status(200).json({id, username, email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
  

// login a user
const loginUser = async (req, res) => {

    const {email, password} = req.body
  
    try {
      const user = await User.login(email, password)
  
      // create a token
      const id=user._id
      const token = createToken(user._id)
  
      res.status(200).json({id, email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }


module.exports = {signupUser, loginUser}