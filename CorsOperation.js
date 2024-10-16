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

module.exports = options