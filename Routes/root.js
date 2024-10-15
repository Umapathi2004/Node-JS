const express = require("express");
const route = express.Router();
const path = require("path");

route.get("^/$|index(.html)?",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","Root","index.html"))
})
route.get("/about(.html)?",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","Root","about.html"))
})

module.exports = route;