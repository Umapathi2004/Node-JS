const express = require("express");
const route = express.Router();
const path = require("path");

route.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","Subdomain","index.html"))
})
route.get("/about(.html)?",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","Subdomain","subabout.html"))
})

module.exports = route;