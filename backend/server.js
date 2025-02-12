const express = require("express");
const axios = require('axios');
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/CommentRoutes");
const bodyParser = require('body-parser');

require("dotenv").config();
const app = express();

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/comment", commentRoutes);



app.get('/api/anime/season/now', async (req, res) => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/seasons/now?limit=3');
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching data from Jikan API:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Jikan API' });
  }
});

app.get('/api/anime/:id', async (req, res) => {
  const animeId = req.params.id;
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}`);
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching data from Jikan API:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Jikan API' });
  }
});


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