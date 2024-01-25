const express = require("express");
const app=express();
const jwt= require("jsonwebtoken");
const jwtpass= "yash123";
const mongoose= require("mongoose");
mongoose.connect("mongodb+srv://yashindia981:6WKUhf2xnRZpJ8dL@cluster0.qimj1yz.mongodb.net/")

//defing a schema for data validation before putting data into database
const User = mongoose.model('users',{
    name: String, password: String
})
const limit=5;

app.use(express.json());

const port=3000;
let totalRequests=0;
let temp=0;
let errors=0;

//users data
// const users=[{
//     name:"yash",
//     pass:"123",
//     requests:0,
// },
// {
//     name:"khushi",
//     pass:"123",
//     requests:0,
// },
// ];

// function userExists(username,pass){
//     for(let i=0;i<users.length;i++){
//         if(users[i].name==username&&users[i].pass==pass){
//             return true;
//         }
//     };
//     return false;

// };
//create middlewares here
// function requestCounter(req,res,next){
//     totalRequests++;
//     const name=req.body.username;
//     for(let it of users){
//         if(it.name==name){
//             temp=it.requests;
//             if(++it.requests>limit){
//                 res.status(403).json({msg:"too many requests! sign in again"});
//             };
                
//         };
//     };
//     next();
// }


function authenticate(req,res,next){
    let token= req.headers.authorization;
    try{const decoded=jwt.verify(token,jwtpass);}
    catch(err){
        return res.status(403).json({msg:"invalid token!!",});
    }
    next();
}
app.get("/signin",(req,res)=>{
    const username =req.body.username;
    const pass=req.body.pass;
    // if(!userExists(username,pass)){
    //     return res.status(403).json({
    //         msg:"you don't have access here",
    //     });
    // };
    for(let it of users){
        if(it.name==username){
            it.requests=0;
        };
    };

    var token=jwt.sign({username : username},jwtpass);
    //we use res.send() if we want to send a string and res.json() if we want to send json
    return res.status(200).json({msg: "you are signed in",
                                token: token});
});

app.get("/signup",async (req,res)=>{
    const username =req.body.username;
    const password=req.body.pass;

    const userExist= await User.findOne({name: username});
    if(userExist){
        return res.status(400).send("user already exists");
    }
    const user= new User({
        name:username,
        password:pass
    });
    user.save();
    res.send("user created succesfully");
});

app.get("/calculate",authenticate,requestCounter,(req,res)=>{
    const value1 =req.body.value1;
    const value2=req.body.value2;
    var sum=parseInt(value1)+parseInt(value2);
    res.status(200).json({
        msg:`final sum is ${sum}`,
        requests:`${temp}`,
    });
});
// catch global errors here

app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
});

app.use((err,req,res,next)=>{
    errors++;
    console.log(err);
    res.status(500).json({
        msg:"sorry, something went wrong",
        totalErros:errors,
        errorRate: errors/totalRequests*100,
    })
})
