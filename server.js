const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const fetch = require("node-fetch");
const yelp = require("yelp-fusion");

require("dotenv").config({path: "./config.env"});
const apiKey = process.env.API_KEY;
const client = yelp.client(apiKey);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

app.use(jsonParser);

app.post("/businesses", (req, res) => {
    const searchRequest = {
        term: req.body.term,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        radius: req.body.radius,
        limit: req.body.limit,
        price: req.body.price,
        openAt: req.body.openNow
    };
    client.search(searchRequest).then((obj) => {
        let response = obj.jsonBody.businesses;
        res.json({data: response})
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});