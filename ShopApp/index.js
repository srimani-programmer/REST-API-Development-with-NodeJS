require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const ShopRoute = require('./routes/ShopRoute');

const databaseConn = require('./config/dbConn');

databaseConn();

// app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use('/sellProduct', ShopRoute);

mongoose.connection.once('open', () => {
    app.listen(8001, () => {
        console.log("Server is listening at port 8001");
    })
})





