// const express=require("express");
// const {UserModel}=require("../models/user.model");
// const bcrypt=require("bcrypt");
// const jwt=require("jsonwebtoken");
// require("dotenv").config();
// const fetch = import('node-fetch')

// const User=express.Router();

// User.get("/data",async(req,res)=>{
//     let data=await UserModel.find();
//     res.send(data);
// })

// User.post("/register",(req,res)=>{
//     try {
//         let user=req.body;
//         bcrypt.hash(user.password,5, async(err,hashed)=>{
//             if(hashed){
//                 user.password=hashed;
//                 console.log(user)
//                 let newUser=new UserModel(user);
//                 await newUser.save();
//                 res.send({"user generated":user})
//             }else{
//                 res.send(err.message);
//             }
//         })
//     } catch (error) {
//         res.send(error.messsage);
//     }
// })

// User.post("/login",async(req,res)=>{
//     try {
//         let {email,password}=req.body;
//         let isPresent=await UserModel.findOne({email});
//         if(!isPresent)return res.send("user not registerd");

//         bcrypt.compare(password,isPresent.password,(err,result)=>{
//             if(result){
//                 let normalToken=jwt.sign({userID:isPresent._id},process.env.normalToken,{expiresIn:60});
//                 let refreshToken=jwt.sign({userID:isPresent._id},process.env.refreshToken,{expiresIn:240});

//                 res.cookie(normalToken,normalToken);
//                 res.cookie(refreshToken,refreshToken);
//                 res.send("login successful")
//             }else{
//                 res.end(err.message);
//             }
//         })
//     } catch (error) {
//         res.send({login:error.message})
//     }
// })

// User.post("/self",async()=>{
//     let data=await UserModel.findOne();
//     let question=`Give me 5 intro question based on the data given. This data is about a candidate based on his knowladege give questions. Education:${data.education},About:${data.about}.Give midium lavel question for the candidate.`
//     fetch("http://localhost:4100/chat",{
//         method:"POST",
//         headers:{
//             "Content-Type":"applicaion/json"
//         },
//         body:JSON.stringify(question)
//     })
//     .then(res=>res.json())
//     .then((data)=>{
//         console.log(data);
//     })
//     .catch(err=>console.log(err));
// })

// User.delete("/delete/:id",async(req,res)=>{
//     try {
//         let id=req.params.id;
//         await UserModel.findByIdAndDelete(id);
//         res.send("user deleted");
//     } catch (error) {
//         res.send(error.message);
//     }
// })


// module.exports={
//     User
// }

const express = require("express");
//import express from "express"
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let fetch=require('node-fetch');
const User = express.Router();

User.get("/data", async (req, res) => {
  let data = await UserModel.find();
  res.send(data);
});

User.post("/register", (req, res) => {
  try {
    let user = req.body;
    bcrypt.hash(user.password, 5, async (err, hashed) => {
      if (hashed) {
        user.password = hashed;
        console.log(user);
        let newUser = new UserModel(user);
        await newUser.save();
        res.send({ "user generated": user });
      } else {
        res.send(err.message);
      }
    });
  } catch (error) {
    res.send(error.message);
  }
});

User.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let isPresent = await UserModel.findOne({ email });
    if (!isPresent) return res.send("user not registered");

    bcrypt.compare(password, isPresent.password, (err, result) => {
      if (result) {
        let normalToken = jwt.sign(
          { userID: isPresent._id },
          process.env.normalToken,
          { expiresIn: 60 }
        );
        // let refreshToken = jwt.sign(
        //   { userID: isPresent._id },
        //   process.env.refreshToken,
        //   { expiresIn: 240 }
        // );

        // res.cookie(normalToken, normalToken);
        // res.cookie(refreshToken, refreshToken);
        res.send({res:"login successful","token":normalToken});
      } else {
        res.send(err);
      }
    });
  } catch (error) {
    res.send({ login: error.message });
  }
});

User.get("/self", async () => {
    let data = await UserModel.findOne();
    let question = `Give me 5 intro question based on the data given. This data is about a candidate based on his knowledge give questions. Education:${data.education},About:${data.about}.Give medium-level questions for the candidate.`;
  
    // import('node-fetch')
    //   .then((module) => module.default('http://localhost:4100/chat', {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(question)
    //   }))
    //   .then(res => {
    //     console.log('Response status:', res.status);
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log('Response JSON:', data);
    //   })
    //   .catch(err => console.log('Fetch error:', err));
    fetch('http://localhost:4100/chat', {
      method: 'POST',
      body: JSON.stringify({question}),
      headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json())
    .then(json => console.log(json));
  });

User.delete("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await UserModel.findByIdAndDelete(id);
    res.send("user deleted");
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = {
  User
};
