const express = require("express");
const bodyparsere = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyparsere.urlencoded({extended:true}));

app.get("/",function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/221ee9c10c";
    const options = {
        method :"POST",
        auth:"Abubakar:69404637d26ce183eefbd78fbc9ff3fe-us21"
    };
    const request = https.request(url, options, function (response) {
        if(response.statusCode === 200) {
            // res.send("Successfully Subscribed");
            res.sendFile(__dirname + "/success.html");
        }
        else {
            // res.send("There was an error with signing up, please try again!");
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
      })

      request.write(jsonData);
      request.end();
});

app.post("/success", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});



// API KEY 
// 69404637d26ce183eefbd78fbc9ff3fe-us21

// https://{dc}.admin.mailchimp.com/lists/members/?id={web_id}.

// MAILCHIMP ID 
// 221ee9c10c.