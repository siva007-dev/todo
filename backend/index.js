const express =require("express")
const cors =require("cors")
const mongoose=require("mongoose")

const corsOptions={
    origin:process.env.APPLICATION_URL,
    methods:`GET,HEAD,PUT,PATCH,POST,DELETE`
}

const app= express()

app.use(cors(corsOptions));

app.use(express.json())

mongoose.connect(process.env.MONGODB_URL).then(()=> console.log("db sucess"))
.catch(()=> console.log("db failed"))

const fruit=mongoose.model("Fruit",{name:String},"fruit")

app.get("/fruit",function(req,res)
{
    fruit.find().then((retdata)=>{
        res.send(retdata)
    })
})

app.post("/addfruit",function(req,res){
    var newfruit=req.body.newfruit

    const newFruit= new fruit(
        {
            name:newfruit
        }
    )

    newFruit.save().then(()=> console.log("saved to db"))
})

module.exports = app

// app.listen(5000,function(){
//     console.log("server started....")
// })