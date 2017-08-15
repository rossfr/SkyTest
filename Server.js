var express = require('express');
var app = express();

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Sky Test Server  listening at http://%s:%s", host, port)
})

// now build the api

app.get('/', function (req, res) {
    res.send('Hello World');
});


const LONDON_LOCATION = "LONDON";
const LIVERPOOL_LOCATION = "LIVERPOOL";
const ARSENAL_TV = "Arsenal TV";
const CHELSEA_TV = "Chelsea TV";
const LIVERPOOL_TV = "Liverpool TV";
const SKY_NEWS = "Sky News";
const SKY_SPORTS = "Sky Sports News";

const SPORTS_CATEGORY = "Sports";
const NEWS_CATEGORY = "News";

app.get('/CustomerLocation',function(req,res){
    let userID = req.query.id;
    let response = {
        location:""
    }
    if(userID === "1234"){
        response.location = LONDON_LOCATION;
    }else{
        response.location = LIVERPOOL_LOCATION;
    }
    //could add an error here if the UserID isnt fouund

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.json(response);
});

app.get('/CatalogueService',function(req,res){
    let location = req.query.location;
    //theses are always returned 
    let response = [
        {category:NEWS_CATEGORY,product:SKY_NEWS},
        {category:NEWS_CATEGORY,product:SKY_SPORTS}
    ];
    if(location === LONDON_LOCATION){
        response.push({category:SPORTS_CATEGORY,product:ARSENAL_TV});
        response.push({category:SPORTS_CATEGORY,product:CHELSEA_TV});
    }else if (location === LIVERPOOL_LOCATION){
        response.push({category:SPORTS_CATEGORY,product:LIVERPOOL_TV});
    }
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.json(response);
});


app.get('/SubmitBasket',function(req,res){
    let basket = req.query.basket;
    this.selected = basket;
    let response = [
        {result:true}
    ]
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.json(response);
});

app.get('/GetBasket',function(req,res){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.json(this.selected);
});