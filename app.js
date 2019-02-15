const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./user/user.router");

mongoose.connect(
    'mongodb://localhost:27017/reg_test_0',
    {useNewUrlParser: true},
    () => {
        console.log('Connect to database...');
    }
);

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use("/users", userRouter);

module.exports = app;