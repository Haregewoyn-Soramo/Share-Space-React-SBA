const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const validator= require('validator');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Password must be at least 6 characters long'],
    
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});


userSchema.statics.signup = async function ({ name, email, password, role }) {
  console.log("signup",email, password)
  if(!email || !password || !name){
    throw Error('all fields must be filled')
  }

  if(!validator.isEmail(email)){
    throw Error('email is not valid')
  }
 
  
    if (password.length < 8) {
      throw Error('Password must be at least 8 characters long');
    } 
   

  const exists = await this.findOne({ email })
  if (exists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash, role });
  return user;
};

//ststic login method
userSchema.statics.login = async function(email, password){
  console.log(email, password)
if(!email || !password){
   throw Error('all fields must be filled')
 }

const user = await this.findOne({email});

console.log('user',user)
if(!user){
  throw('Incorrect email')
}
const match = await bcrypt.compare(password, user.password)
console.log("match",match)
if(!match){
  throw Error('Incorrect Password')
}
return user
}


const User = mongoose.model('User', userSchema);

module.exports = User;
