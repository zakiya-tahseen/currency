const express = require('express');
const bp = require('body-parser');
const axios = require('axios');
const app = express();
const ejs = require("ejs");
app.use(bp.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs", { servervalue: "" });
});

app.post('/', (req, res) => {
    let currency = parseInt(req.body.cno);
    let from = req.body.fcurrency;
    let to = req.body.tocurrency;
    let url =`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_2kNz2JE2zjSeNJhgP7xei17GDoe5Qo9UB7pOsad4&currencies=${to}&base_currency=${from}`;


    axios.get(url)
        .then((response) => {
            const rate = response.data.data[to];
            const convertedAmount = currency * rate;
            res.render('index.ejs', { servervalue: convertedAmount });
        })
        .catch((error) => {
            console.error("error fetching", error.message);
            res.render('index.ejs', { servervalue: "Error fetching data from API" });
        });
});

app.listen(3000, () => {
    console.log("server start at port 3000");
});