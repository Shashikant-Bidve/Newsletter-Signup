const express = require("express");
const bodyParser = require("body-parser");
const https = require("node:https");
const request = require("request");
// const exp = require("node:constants");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",(req,res)=>{

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    
    var data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }

            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us12.api.mailchimp.com/3.0/lists/76b76c02ef";
    const options = {
    method : "POST",
    auth : "shashi:186af84ed264d724832183bd94500f57-us12"
}
const request = https.request(url,options,(response)=>{
    if(response.statusCode == 200){
        res.sendFile(__dirname+"/success.html");
        
        
    }else{
        res.sendFile(__dirname+"/failure.html");
    }
    res.on("data",(data)=>{
        console.log(JSON.parse(data));
    })
});
    request.write(jsonData);
    request.end();
});
app.post("/failure",(req,res)=>{
    res.redirect("/");
});
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});



/*
186af84ed264d724832183bd94500f57-us12
 76b76c02ef
*/ 