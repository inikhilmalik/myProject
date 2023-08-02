const express=require("express");
const { connection } = require("./db");
const { dataRouter } = require("./routes/data.routes");
const app=express();
const cors=require("cors")
require("dotenv").config()

const port=process.env.PORT||8080;
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Homepage")
})

app.use("/data",dataRouter);

app.use("/uploads",express.static("uploads"))

app.listen(port,async()=>{
    try{
        await connection;
        console.log("connected to DB")
    }catch(err){
        console.log("Cannot connected to DB")
        console.log(err);
    }

    console.log(`server is running at port ${port}`)
})