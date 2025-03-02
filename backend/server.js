const express = require("express");
const axios = require('axios');
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/ReviewRoutes");
const bodyParser = require('body-parser');

require("dotenv").config();
const app = express();

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/review", reviewRoutes);




//slide anime season now
app.get('/api/anime/season/now', async (req, res) => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/seasons/now?limit=5');
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching data from Jikan API ayo:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Jikan API' });
  }
});

//winter
app.get('/api/anime/season/2024/winter', async (req, res) => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/seasons/2024/winter?limit=5');
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching data from Jikan API ayo:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Jikan API' });
  }
});

//summer
app.get('/api/anime/top', async (req, res) => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/seasons/2024/summer?limit=10');
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching data from Jikan API ayo:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Jikan API' });
  }
});

//fall
app.get('/api/anime/top', async (req, res) => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/seasons/2024/fall?limit=10');
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching data from Jikan API ayo:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Jikan API' });
  }
});

//spring
app.get('/api/anime/top', async (req, res) => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/seasons/2024/spring?limit=10');
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching data from Jikan API ayo:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Jikan API' });
  }
});

app.get('/api/anime/search/:searchquery', async (req, res) => {
  const searchQuery = req.params.searchquery;
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${searchQuery}&limit=5`);
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching data from Jikan API ayo:', error.message);
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