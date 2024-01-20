const express = require("express");
const app=express();
app.use(express.json());

const port=3000;
app.post("/health-checkup",(req,res)=>{
    const kidneys =req.body.kidneys;
    const kidlength=kidneys.length;
    res.send("you have"+ kidlength +"kidneys");
});

app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
});
