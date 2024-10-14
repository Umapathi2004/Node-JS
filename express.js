const express = require("express");
const port = process.env.PORT || 4500;
const path = require("path");
const app = express();
const cors = require("cors");
const eventLogs = require("./eventLogs.js")

const whiteList = ["https://www.youtube.com","http://localhost:4500"];
const options={
    origin:(origin,callback)=>{
       if(whiteList.indexOf(origin)!=-1 || !origin){
        callback(null,true);
       }
       else{
        callback(new Error("Cors dos't allows!"))
       }
    },
    optionsSuccessStatus:200
}
app.use(cors(options));
app.use("/",express.static(path.join(__dirname,"public")))
app.use("/Subdomain",express.static(path.join(__dirname,"public")))
app.use((req,res,next)=>{
       const message=`${req.hostname} ${req.method} ${req.url} ${req.headers.origin}`
       eventLogs(message,"Events.txt");
    next();
})
app.get("^/$|index(.html)?",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})
app.get("/about(.html)?",(req,res)=>{
    res.sendFile(path.join(__dirname,"about.html"))
})
app.get("/subdomain",(req,res)=>{
    res.sendFile(path.join(__dirname,"Subdomain","index.html"))
})
app.get("/subdomain/about(.html)?",(req,res)=>{
    res.sendFile(path.join(__dirname,"Subdomain","subabout.html"))
})
app.all("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"404.html"))
})
app.use((err,req,res,next)=>{
    console.log(err.message);
    next()
})
app.listen(port,()=>console.log(`This App currently runing in http://localhost:${port}`));