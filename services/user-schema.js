const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema as module in mongoose
const userschema = new Schema({
    Name: {
        type: String,
        required: true,
        minlength:4,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength:4,
        trim:true
    },
    password:{
        type: String,
        required: true,
        minlength:4,
    }
});

// export schema as modules 
module.exports = mongoose.model('users',userschema);

// // modules in mongoose
// const user = mongoose.model('users', {
//     firstName: {
//         type: String,
//         required: true,
//         minlength:4,
//         trim:true
//     },
//     lastName: {
//         type: String,
//         required: true,
//         minlength:4,
//         trim:true
//     },
//     isActive:{
//         type:Number,
//         default:0
//     }
// });

// module.exports = user