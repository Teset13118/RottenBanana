const axios = require("axios");

//slide anime season now
exports.getSeasonNow =  async (req, res) => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/seasons/now?limit=10');
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching data from Jikan API ayo:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Jikan API' });
  }
};

//winter
exports.getSeasonWinter = async (req, res) => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/seasons/2024/winter?limit=10');
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching data from Jikan API ayo:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Jikan API' });
  }
};

//summer
exports.getSeasonSummer = async (req, res) => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/seasons/2024/summer?limit=10');
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching data from Jikan API ayo:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Jikan API' });
  }
};

//fall
exports.getSeasonFall = async (req, res) => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/seasons/2024/fall?limit=10');
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching data from Jikan API ayo:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Jikan API' });
  }
};

//spring
exports.getSeasonSpring = async (req, res) => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/seasons/2024/spring?limit=10');
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching data from Jikan API ayo:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Jikan API' });
  }
};

exports.getUpcoming = async (req, res) => {
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/seasons/upcoming?limit=10`);
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching data from Jikan API ayo:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Jikan API' });
  }
};

exports.getAnimeSearch = async (req, res) => {
  const searchQuery = req.params.searchquery;
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${searchQuery}&limit=5`);
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching data from Jikan API ayo:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Jikan API' });
  }
};

exports.getAnimeDetail = async (req, res) => {
  const animeId = req.params.id;
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}`);
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching data from Jikan API:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from Jikan API' });
  }
};