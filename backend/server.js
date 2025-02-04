const express = require("express");
const app = express();
const PORT = 8080;
const axios = require('axios');
const cors = require("cors");


app.use(cors());
app.use(express.json());



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


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});