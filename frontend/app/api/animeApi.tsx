import axios from 'axios';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function FetchAnimeListSeasonNow(){
    try {
      const res = await axios.get("http://localhost:8080/api/anime/season/now");
      return res.data;
    } catch (error) {
      console.error("Error fetching animeList API now:", error);
      throw error;
    }
};

export async function FetchAnimeSeasonWinter(){
  try {
    const res = await axios.get("http://localhost:8080/api/anime/season/2024/winter");
    return res.data;
  } catch (error) {
    console.error("Error fetching animeList API winter:", error);
    throw error;
  }
};


export async function FetchAnimeSeasonSpring(){
  try {
    const res = await axios.get("http://localhost:8080/api/anime/season/2024/spring");
    return res.data;
  } catch (error) {
    console.error("Error fetching animeList API: spring", error);
    throw error;
  }
};

export async function FetchAnimeSeasonSummer(){
  await delay(2500);
  try {
    const res = await axios.get("http://localhost:8080/api/anime/season/2024/summer");
    return res.data;
  } catch (error) {
    console.error("Error fetching animeList API: summer", error);
    throw error;
  }
};


export async function FetchAnimeSeasonFall(){
  await delay(3500);
  try {
    const res = await axios.get(`http://localhost:8080/api/anime/season/2024/fall`);
    return res.data;
  } catch (error) {
    console.error("Error fetching animeList API: fall", error);
    throw error;
  }
};


export async function FetchAnimeUpComing(){
  await delay(4500);
  try {
    const res = await axios.get(`http://localhost:8080/api/anime/season/upcoming`);
    return res.data;
  } catch (error) {
    console.error("Error fetching animeList API: coming", error);
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