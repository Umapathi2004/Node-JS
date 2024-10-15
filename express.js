const express = require("express");
const port = process.env.PORT || 4500;
const path = require("path");
const fs = require("fs").promises;
const app = express();
const cors = require("cors");
const root = require("./Routes/root")
const subdomain = require("./Routes/subdomain")

const whiteList = ["https://www.youtube.com","http://localhost:4500"]; //HANDEL CORS....
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

app.use(async (req,res,next)=>{   //THIS LINE WAS USED FOR MANAGE LOGS...
    const message=`${req.hostname} ${req.method} ${req.url} ${req.headers.origin}`
    const date = new Date();
    const data = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}   ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()} ${message} \n`;
    console.log(data);
    console.log(path.join(__dirname,"Logs","Events.txt"))
    await fs.appendFile(path.join(__dirname,"Logs","Events.txt"),data)
    next();
})

app.use("/",root)   //MANAGE ROUTES...
app.use("/subdomain",subdomain);
app.all("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"Root","404.html"))
})

app.use(async (err,req,res,next)=>{  //THIS LINE WAS USED FOR MANAGE ERROR...
    const date = new Date();
    const data = `${req.hostname} ${req.method} ${req.url} ${req.headers.origin} ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}   ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()} ${err.message} \n`;
    await fs.appendFile(path.join(__dirname,"Logs","Error.txt"),data);
    res.send(`${err.message}`);
    next()
})

app.listen(port,()=>console.log(`This App currently runing in http://localhost:${port}`)); //START SERVER...