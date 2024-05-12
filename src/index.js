const express = require("express")
const bodyParser =require("body-parser")
const mongoose =require("mongoose")

const app = express()

app.set("view engine","ejs")

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/myapp',{
})

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('applicationform.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    res.render("signuppage");
    
}).listen(3000);


console.log("Listening on PORT 3000");

// Define Port for Application
const port = 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
