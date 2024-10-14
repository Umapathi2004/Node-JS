const { log } = require("console");
const fs=require("fs").promises
const path=require("path")
const eventLogs = async (message,method) =>{
    const date = new Date();
    const data = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}   ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()} ${message} \n`;
    console.log(data);
    console.log(path.join(__dirname,"Logs",method))
    await fs.appendFile(path.join(__dirname,"Logs",method),data)
}
module.exports = eventLogs;