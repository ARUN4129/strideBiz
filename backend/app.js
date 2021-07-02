const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/User');
const cors = require('cors');


const path = require('path');
 
mongoose.connect("mongodb+srv://arun:xDuyuaP6T47vlCQi@cluster123.ulyfy.mongodb.net/strideBiz?retryWrites=true&w=majority",{ useNewUrlParser : true})
.then(() => {
    console.log("Connected to Database");
})
.catch((err) => {
    console.log("Connection Error!\n"+ err); 
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use("/images", express.static(path.join("backend/images")));
app.use(cors());
app.use((req, res, next) => {
    res.setHeader("Access-Controll-Allow-Origine", "*");
    res.setHeader(
        "Access-Controll-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
        "Access-Controll-Allow-Headers",
        "Origine, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});
//   [ /api/posts ] --> is common for all rout path in post.js file...
app.use("/api/user" , userRouter);

module.exports = app; 
