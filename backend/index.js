const dotenv = require('dotenv');
const exp = require("express");
const app = exp();
const cors = require('cors');

const os = require('os');
dotenv.config();
app.use(exp.json())
app.use(cors())

var imageRouter = require("./routes/imagesRouter")

app.get("/",(req,res)=>{
    return res.send({server: "running"})
})
app.use("/images",imageRouter)


app.listen(3200,()=>{
    console.log("running")
})



