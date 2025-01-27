const graphql = require('graphql');
const user = require('../services/user-schema');
const bcrypt = require('bcryptjs');

const encryptHash = async (args) => {
    bcrypt.genSalt(10, (err, salt)=>{
      bcrypt.hash(args, salt, (err, hash) => {
        args.password = hash;
        console.log('~~~~~~args.password~~~~~~~',hash);
        return hash
      })
    })
  }
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLString
    } = graphql ;

      
const userType = new GraphQLObjectType({
      name: 'userdata',
      fields: () => ({
        id: {type:GraphQLString},
        email: {type:GraphQLString},
        Name: {type:GraphQLString},
        password: {type:GraphQLString}
      }),
  });


module.exports.Owner = {
    type: new GraphQLList(userType),
    resolve() {
      let data = [
          {
              id:11, Name:'pavan', email: 'xyz.com'
          },
          {
              id:12, Name:'patel',  email: 'abc.com'
          }
      ]
      return data
    },
  },

module.exports.AddUser = {
    type: userType,
    args:{
        Name:{type:GraphQLString},
        email:{type:GraphQLString},
        password:{type:GraphQLString}
    },
    resolve: async (parent, args) => {
        const salt =await bcrypt.genSalt(10)
        password =await bcrypt.hash(args.password, salt)
        let u = user.create({
            Name: args.Name,
            email:args.email,
            password:password
        })
        return u
    }
}

module.exports.RemoveUser = {
    type: userType,
    args:{
        id:{type:GraphQLString},
    },
    resolve(parent, args) {
        return user.findByIdAndDelete(args.id)
    },
}

module.exports.FindUser = {
    type: userType,
    args:{id:{type:GraphQLString}},
    resolve(parent, args) {
      return user.findById(args.id)
    },
  }

module.exports.GetUsers = {
    type: new GraphQLList(userType),
    resolve () {
      let data =  user.find()
      return data
    }
}