const mongoose = require('mongoose')
const User = require('../models/usersModels')
const jwt = require('jsonwebtoken')

const createToken = (id) =>{
  return jwt.sign({id}, process.env.SECRET, {expiresIn: '3d'})
}


const userLogin = async(req, res) =>{
  const {email, password} = req.body
 try {
  const user = await User.login(email, password)
console.log("controller",user)
  const token = createToken(user._id)
  res.status(200).json({email, token})
  
 } catch (error) {
  console.log(error)
  res.status(404).json({error: error.message})
 }
}



const userSignup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await User.signup({ name, email, password, role });
    console.log(user);
    //create token 
    const token = createToken(user._id)

    res.status(200).json({ name, email, role, token });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.message });
  }
};


module.exports = {userLogin, userSignup}