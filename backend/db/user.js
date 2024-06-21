const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({name:"string",email:"string",pass:"string"});
// const productModel =  mongoose.model('products',productSchema);

module.exports = mongoose.model('users',userSchema);