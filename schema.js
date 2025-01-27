const graphql = require('graphql');
const {Owner, RemoveUser, AddUser, FindUser, GetUsers} = require('./queries/user');

const {
    GraphQLSchema,
    GraphQLObjectType,
    } = graphql ;

var rootQuery = new GraphQLObjectType({
    name: 'admin',
    fields: {
      owner: Owner
    },
});

var Mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    addUser: AddUser,
    removeUser: RemoveUser,
    getUsers: GetUsers,
    findUser: FindUser
    },
});


module.exports = new GraphQLSchema ({query : rootQuery, mutation: Mutation})
