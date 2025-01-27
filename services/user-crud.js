//mongoose crud operation

const user = require('./user-schema');
const bcrypt = require('bcryptjs');

// modules in mongoose

const userfeature = (function () {

    const login = (req,res) => {
        user.findOne({email:req.body.email}).then(user => {
            if(user){
              bcrypt.compare(req.body.password, user.password ,(err, matched)=>{
                if (err) return err;
                if (matched) {
                    message = 'Successfully login using user ' + user.Name;
                    res.send(message);
                }else{
                    message = 'user invalid password';
                    res.status(200).send(message);
                  }
              })
            } else {
                message = 'user not found : ' + req.body.password ;
              res.send(message);
            }
          })        
    };

    const adduser = (req,res) => {
        console.log('~~~~~~~~~~~~~`')
        const newUser = new user();
          newUser.Name= req.body.Name,
          newUser.email= req.body.email,
          newUser.password= req.body.password
          user.findOne({email:req.body.email}).then(userfound => {
          if (userfound) {
            res.send(`this email is already in use, please try with diffrent email id ${userfound}`).status(200);
          } else {
              // encryptHash(newUser, res);
              bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) return err;
                  newUser.password = hash;
                  newUser.save().then(user => {
                    res.send('added new user' + user).status(200);;
                  }).catch(e => {
                    res.send('user not saved bcz' + e).status(200);;
                  })
                })
              })
            }
          })
    
           // // check if user already there 
        // if (newUser.Name !== 'pavan') {
        //   newUser.save();
        //   res.send('inserted user');
        // }else{
        //   res.status(200).send('user already there');
        // }
        
    };

    const encryptHash = (newUser, res) => {
      bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) return err;
          newUser.password = hash;
          newUser.save().then(user => {
            res.send('added new user' + user).status(200);;
          }).catch(e=>{
            res.send('user not saved bcz' + e).status(200);;
          })
        })
      })
    }

    
    const findall = (req,res) => { 
      user.find({}).then(function (fetched_data){
        res.send(fetched_data);
      })
    }

    const findalluser = async () => { 
      user.find({}).then(function (fetched_data){
        return(fetched_data);
      })
      // return (user.find({}))
    }

    const updateuser = (req,res) => { 
      const id = req.params.id;
      console.log('sss',id)
      const Name = req.body.Name;
      const email = req.body.email;
      const password = req.body.password;

      console.log('name----',Name)
      user.findByIdAndUpdate(id,{$set: {Name: Name, email: email, password: password}},{new: true})
      .then(id_data => {
        res.send(id_data);
      })
    }

    const deleteuser = (req,res) => { 
      const id = req.params.id;
      user.findByIdAndDelete(id).then(user => {
        res.send(`deleted user ${user}`);
      })
    }
    const patchuser = (req,res) => { 
      const id = req.params.id;
      const Name = req.body.Name;
      console.log(Name)

      user.findByIdAndUpdate(id,{$set: {Name: Name}},{new: true})
      .then(id_data => {
        res.send(id_data);
      })
    }

    const finduserandupdate = (req,res) => { 
          user.findOne({Name:req.body.Name})
            .then(user => {
              user.Name = 'updated';
              user.email = req.body.email;
              password = req.body.password;

              user.save().then(data =>{
                res.send(data);
              })
            }).catch(e => {
              console.log('error found:',e)
            })
    }


    return {
        login,
        adduser,
        findall,
        encryptHash,
        findalluser,
        updateuser,
        deleteuser,
        finduserandupdate,
        patchuser
    }
})();

module.exports = userfeature