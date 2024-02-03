
const express = require("express");
const bodyParser =require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

var items =[];
var workItems=[];

app.get("/",function(req,res){
    

    var today = new Date();

    var options = {
        weekday : "long",
        day : "numeric",
        month : "long"
    };


    var day=today.toLocaleDateString("en-US",options);

    res.render("list",{title:day,newItems:items});

});


app.post("/",function(req,res){
    var item = req.body.item;
    var type= req.body.button;
    if(type==="work"){
        workItems.push(item);
        res.redirect("/work")
    }else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work",function(req,res){

    res.render("list",{title:"work", newItems:workItems})

});


app.listen(3000,function(){
    console.log("server is running on port 3000");
});
