 const mongoose = require('mongoose');

 const proSchema = new mongoose.Schema({name:"string",phone:"string",email:"string",linkedin:"string",twitter:"string"})

 module.exports = mongoose.model('products',proSchema);