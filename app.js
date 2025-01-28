const mongoose = require('mongoose');
const userfeature = require('./services/user-crud.js')
const express = require('express');
const app = express()
const portno = 8001
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema.js')

// app.use()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://0.0.0.0:27017/mongoose');
mongoose.connection
  .once('open',()=> console.log('Connected'))
  .on('error',(err) => {
    console.log('not connected');
  })

  const context = async (data) => {
    return data;
  }
  app.use(
    '/graphql',
    graphqlHTTP( async req => ({
      schema,
      graphiql: true,
      context:()=>context(data)
    })),
  );

  app.get('/', (req,res) => {
    res.send('DATA');
  })

  // add user to database and encryps password 
  app.post('/adduser', (req,res) => {
    userfeature.adduser(req, res);
  })

// fetch all users from database
  app.get('/users', (req,res) => {
    userfeature.findall(req, res);
  })

  // check user exist in database and compare password to get login
  app.post('/login', (req,res) => {
    userfeature.login(req, res)

  })

// patch update user from database // patch can update one part of field // patch can have few details incompare to PUT
  app.patch('/users/:id', (req,res) => {
    console.log('ASADADADADA')
    userfeature.patchuser(req, res)
  })

  // PUT update all field
  app.put('/users/:id', (req,res) => {
    userfeature.updateuser(req, res)
  })


  //rempve/delete user from database http://localhost:8008/users/:id
  app.delete('/users/:id', (req,res) => {
    userfeature.deleteuser(req, res)
  })

  // app.delete('/users', (req,res) => {
  //   userfeature.deleteuser(req, res)
  // })

  //find user by property and update
  app.put('/users/', (req,res) => {
    userfeature.finduserandupdate(req, res)
  })

  
const port = portno || process.env.PORT
app.listen(port,"127.0.0.1",() => {
  console.log(`listning the port ${portno}`)
  
  });