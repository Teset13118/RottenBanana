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

export async function FetchAnime(id: string){
  try {
    const res = await axios.get(`http://localhost:8080/api/anime/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching anime API:", error);
    throw error;
  }
};