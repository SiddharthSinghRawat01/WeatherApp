

const express = require("express");
const bodyParser = require("body-parser")
const https = require("https")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

   res.sendFile(__dirname+"/index.html")

});

app.post("/",function(req,res){

    console.log(req.body.cityName);
    
    const query = req.body.cityName
    const apikey = "8b9eca79f6fc819addc53f6782f019cb"
    const unit = "metric"
    
    
    const url = ("https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+apikey+"&units="+unit+"");    
    
    
    https.get(url,function(respond){
        console.log(respond.statusCode)//we can be specfic and log the status code like 404 200
    
        respond.on("data",function(data){
            const weatherAppdata = JSON.parse(data) // taking JSON.parse() as a const so we can use easily
            
            const temp = weatherAppdata.main.temp
            const weatherDescription = weatherAppdata.weather[0].description
            const icon =weatherAppdata.weather[0].icon
            const image = "https://openweathermap.org/img/wn/"+ icon +"@2x.png" // for inge we take url of image and thenedit it "icon" in Place of 10n because we declare it in priveious constant which is icon
    
            console.log(temp);  // this will send it to console 
        
            res.write("<h1>The temp in "+ query +" is "+ unit +" degree celcius</h1>") //this will send it to the page
        res.write("<p>the weather "+ weatherDescription + " today</p>")
        res.write("<img src="+ image +">")
        res.send();
    
        })//if we simply console log data it will give us response in hexadecimal form so we use JSON
    
       
    });
    

    
})

app.listen(3000,function(){

    console.log("this is at port 3000.")
});
//there can only be one .send in the programe because where we send there bacially the programe ends
//console.log prints in console where as .send print inthe webpage or .sendfile send pfile to page


