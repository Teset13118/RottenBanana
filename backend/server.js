const express = require("express");
const axios = require('axios');
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/ReviewRoutes");
const userRoutes = require("./routes/๊userRoutes")
const animeRoutes = require("./routes/animeRoutes")


require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/user", userRoutes);
app.use("/api/anime", animeRoutes)



const PORT = process.env.PORT || 8080;
const MONGOURL = process.env.MONGO_URL

mongoose.connect(MONGOURL)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Database connection is Ready " + "and Server is Listening on Port ", PORT);
    })
})
.catch((err)=>{
    console.log("A error has been occurred while"+ " connecting to database.");    
})