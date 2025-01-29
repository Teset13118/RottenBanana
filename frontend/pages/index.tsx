import { useEffect, useState } from "react";



function SmallAnimeboxRandom() {
  const [anime, setAnime] = useState<any>(null);


  useEffect(() => {
    fetch("https://api.jikan.moe/v4/random/anime")
      .then((res) => res.json())
      .then((data) => setAnime(data))
      .catch((err) => console.error("Error fetching anime API:", err));
  }, []);
  return (
    <li>
    {anime ? (
      <div>
        <p>{anime.data.title_japanese}</p>
        <img
            src={anime.data.images.jpg.image_url}
            alt={anime.data.title}
            style={{ width: "100px", height: "150px", objectFit: "cover", borderRadius: "10px" }}
          />
      </div>
      ) : (
        <p>Loading anime...</p>
      )}
    </li>
  )
}

export default function Home() {

  return (
    <div>
      <p>Random Anime list</p>
      <ul>
        <SmallAnimeboxRandom />
        <SmallAnimeboxRandom />
      </ul>
    </div>
  );
}
