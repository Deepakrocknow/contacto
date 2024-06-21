 const mongoose = require('mongoose');

 const proSchema = new mongoose.Schema({name:"string",price:"string",category:"string",userId:"string",company:"string"})

 module.exports = mongoose.model('products',proSchema);