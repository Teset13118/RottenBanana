'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

interface Anime {
    title: string;
    mal_id: number;
    images: {
      jpg: {
        image_url: string;
      };
    };
  }

function SmallAnimebox() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:8080/api/anime/season/now")
      .then((res) => res.json())
      .then((data) => setAnimeList(data))
      .catch((err) => console.error("Error fetching anime API:", err));
  }, []);


  const handleClick = (id: number) => {
    router.push(`/home/${id}`);
  };

  return (
    <ul>
      {animeList.length > 0 ? (
        animeList.map((anime, index) => (
          <li key={index} onClick={() => handleClick(anime.mal_id)}>
            <p>{anime.title}</p>
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              style={{ width: "100px", height: "150px", objectFit: "cover", borderRadius: "10px" }}
            />
          </li>
        ))
      ) : (
        <p>Loading anime...</p>
      )}
    </ul>
  )
}


export default function Home(){
    return(
        <SmallAnimebox/>
    )
}