const app = require("./app")
const dotenv = require("dotenv")
const {connectDB} = require("./config/db")

// config
dotenv.config({path : "config/config.env"})


app.listen(process.env.PORT,async()=>{
    // connnecting to db 
    try{
        await connectDB();
        console.log(`server is Listening on http://localhost:${process.env.PORT}`)
    } catch(err){
        console.log(err,{ err_msg : "Error occured"})
    }
})