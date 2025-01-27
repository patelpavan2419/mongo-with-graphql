# mongo-with-graphql


## Prerequisites
- Node.js and npm installed (for local development)

## Steps to Set Up and Run the Service 
1. **Clone the repository** 
``` 
git clone https://github.com/patelpavan2419/mongo-with-graphql.git

```

2. **install dependencies** 
```
npm install
```

3. **Start the server**
```
npm start
```
server start at http://localhost:8000/


## RUN mongoDB Crud operation
### execute commands from requests.http file

## RUN mongoDB Crud operation using GraphQL
use http://localhost:8000/graphql  endpoint to perform below queries 

### get owner data for name and id
```
query {
  owner {
    id,
    email
  }
}
```

### get users data for name and id
```
mutation {
  getUsers {
    Name,id
  }
}
```

### find users data for name , id & email

```
mutation{
  findUser (id: "668d01aa2145bf62ba30489f") {
    Name,id, email
  }
}
```
### remove users data using id
mutation{
  removeUser (id: "667a6e0acc22fc86c3ba7875") {
    Name,id, email
  }
}


### add users data
```
mutation {
  addUser (Name: "tech1", email: "tech@gmail.com", password: "aasdsd4323asd##@#23") {
    Name,id
  }
}
```

<!-- query {
  addUser (Name: "tech2", email: "tech@gmail.com", password: "aasdsd4323asd##@#3") {
    Name,id
  }
} -->