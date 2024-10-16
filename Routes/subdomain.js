const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","Subdomain","index.html"))
})
router.get("/about(.html)?",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","Subdomain","subabout.html"))
})

module.exports = router;