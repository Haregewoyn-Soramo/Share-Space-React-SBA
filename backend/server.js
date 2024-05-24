require('dotenv').config()
const express = require('express');
const router = require('./routes/products');
const userRouter = require('./routes/user.js');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());

app.use((req, res, next) =>{
  console.log(req.path, req.method)
  next()
}) 
app.use('/api/products', router)
app.use('/api/user', userRouter)

mongoose.connect(process.env.MONGO_URI)
 .then(() => {
    app.listen(port, () => {
    console.log('server connected to db and Listening on fff:', port);
  });
  
 }) 
 .catch ((error)=>{
    console.log(error)
  })



