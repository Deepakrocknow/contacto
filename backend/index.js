const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwtkey  = 'as2809'

require('./db/config');

const user = require('./db/user');
const product = require('./db/product');

app.use(express.json());
app.use(cors());

app.post('/register',async(req,resp)=>{ 
    let ans = await new user(req.body);
    let res = await ans.save()
    res = res.toObject();
    delete res.pass  ;
    console.log(res);
    jwt.sign({res},jwtkey,{expiresIn:'2h'},(err,token)=>{
      if(err){
        resp.send("It messed up");
      }
      resp.send({res,auth:token});
    })
})

app.post('/login',async(req,resp)=>{
      console.log(req.body);
      if(req.body.pass && req.body.name){
        let ans = await user.findOne(req.body).select("-pass");
        if(ans){
          jwt.sign({ans},jwtkey,{expiresIn:'2h'},(err,token)=>{
            if(err){
              resp.send("we messed up");
            }
            resp.send({ans,auth:token});
          })
        }
        else{
          resp.send({result:"no user found"});
        }
      }
      else{
        resp.send({result:"no user found"});
      }
})

app.post('/addpro',verifytok,async(req,resp)=>{
  let ans = await new product(req.body);
  let res = await ans.save();
  console.log(res);
  resp.send(res);
})
  

app.get('/products',verifytok, async(req,resp)=>{
       let ans  = await product.find();
       if(ans.length){
         resp.send(ans);
       }
       else{
          resp.send({result:"No products found"})
       }
})

app.delete('/prod/:id',verifytok,async(req,resp)=>{
      const ans = await product.deleteOne({_id:req.params.id})
      resp.send(ans);
})

app.get('/prod/:id',verifytok,async(req,resp)=>{
      const ans = await product.findOne({_id:req.params.id});
      if(ans){
        resp.send(ans);                        
      }
})

app.put('/prod/:id',verifytok, async(req,resp)=>{
     const ans = await product.updateOne({_id:req.params.id},{$set:req.body})
     resp.send(ans);
})

app.get('/search/:key',verifytok,async(req,resp)=>{
     let res = await product.find({
        "$or":[
          {name:{$regex:req.params.key}},
          {phone:{$regex:req.params.key}},
          {email:{$regex:req.params.key}},
          {linkedin:{$regex:req.params.key}},
          {twitter:{$regex:req.params.key}},
        ]
     })
     resp.send(res)
})


function verifytok(req,resp,next){
      let token = req.headers['authorization'];
      console.log(token)
      if(token){
          jwt.verify(token,jwtkey,(err,valid)=>{
              if(!err){
                 resp.send("kuch gadbad hai")
              }
              else{
                   next();
              }
          })  
      }
      else{
        resp.send("please add token");
      }
}

app.listen(4500);


