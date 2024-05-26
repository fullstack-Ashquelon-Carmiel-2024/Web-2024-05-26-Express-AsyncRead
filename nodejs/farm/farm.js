const express = require('express');
const fs = require('fs');

const replaceTempl = require('./modules/replace-templ');

let port = 3051;

let dataJSON = fs.readFileSync('./data/data.json','utf-8');
const dataAr = JSON.parse(dataJSON);

let productTempl = fs.readFileSync('./templates/productTempl.html','utf-8');

// Create the server of express.
// Traditionally we call it "app".
const app = express();

app.get('/',(req,res) => {

    res.send(`<h1>Sweet, Sweet Home of EXPRESS Server😀</h1>`)

})

app.get('/product',(req,res) => {

    res.send(`<h1>Our farm has the best meat 🥩</h1>`)

})

// MISSION: create route to get /data and to send
//    the whole dataJSON

app.get('/data',(req,res) => {

    res.send(dataJSON);

})

app.get('/carrot',(req,res) => {

    //res.send(dataAr[3]);
    res.send(productTempl.replaceAll('%*PRODUCTNAME*%',dataAr[3].productName)
                         .replaceAll('%*IMAGE*%',dataAr[3].image));

})

app.get('/product/:id',(req,res) => {

    console.log('req.params:\n',req.params)

    res.send(replaceTempl(productTempl, dataAr[req.params.id]));
    /* res.send(productTempl.replaceAll('%*PRODUCTNAME*%',dataAr[req.params.id].productName)
                         .replaceAll('%*IMAGE*%',dataAr[req.params.id].image)); */

})
/* app.get('/product/:id',(req,res) => {

    console.log('req.params:\n',req.params)

    res.send(productTempl.replaceAll('%*PRODUCTNAME*%',dataAr[req.params.id].productName)
                         .replaceAll('%*IMAGE*%',dataAr[req.params.id].image));

}) */

// This is an example for 2 parameters
app.get('/product/:id/:color',(req,res) => {

    console.log('req.params:\n',req.params)
    //res.send(dataAr[3]);
    res.send(productTempl.replaceAll('%*PRODUCTNAME*%',dataAr[3].productName)
                         .replaceAll('%*IMAGE*%',dataAr[3].image));

})

app.listen(port,() => {

    console.log(`Listening on the port ${port} ...`)

})