import axios from 'axios';

export async function FetchAnimeListSeasonNow(){
    try {
      const res = await axios.get("http://localhost:8080/api/anime/season/now");
      return res.data;
    } catch (error) {
      console.error("Error fetching animeList API:", error);
      throw error;
    }
};

export async function FetchAnimeSeasonWinter(){
  try {
    const res = await axios.get("http://localhost:8080/api/anime/season/2024/winter");
    return res.data;
  } catch (error) {
    console.error("Error fetching animeList API:", error);
    throw error;
  }
};

export async function FetchAnimeUpComing(){
  try {
    const res = await axios.get(`http://localhost:8080/api/anime/season/upcoming`);
    return res.data;
  } catch (error) {
    console.error("Error fetching animeList API:", error);
    throw error;
  }
};

export async function FetchAnimeSearch(searchQuery: string){
  try {
    const res = await axios.get(`http://localhost:8080/api/anime/search/${searchQuery}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching animeList API:", error);
    throw error;
  }
};

export async function FetchAnime(id: string){
  try {
    const res = await axios.get(`http://localhost:8080/api/anime/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching anime API:", error);
    throw error;
  }
};