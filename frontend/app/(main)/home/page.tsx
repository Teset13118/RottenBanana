'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Anime } from '@/types/type';
import { FetchAnimeListSeasonNow, FetchAnimeSeasonWinter } from '@/app/api/animeApi';
import { AnimeCard } from "@/app/components/animeCard";



//slide anime season นั้นๆ

function AnimeThisSeason() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const data = await FetchAnimeListSeasonNow();
      setAnimeList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (id: number) => {
    router.push(`/home/animeDetail/${id}`);
  };

  return (
    <div>

        {animeList.length > 0 ? (
          animeList.map((anime) => (
            <AnimeCard
              key={anime.mal_id}
              title={anime.title}
              imageUrl={anime.images.jpg.image_url}
              onClick={() => handleClick(anime.mal_id)}
            />
          ))
        ) : (
          <p>Loading anime...</p>
        )}
    </div>
    
  )
}

//season ใดๆ เปลี่ยน
//upcoming
function AnimeSeasonWinter(){
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const data = await FetchAnimeSeasonWinter();
      setAnimeList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (id: number) => {
    router.push(`/home/animeDetail/${id}`);
  };

  return (
    <div>
      {animeList.length > 0 ? (
        animeList.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            title={anime.title}
            imageUrl={anime.images.jpg.image_url}
            onClick={() => handleClick(anime.mal_id)}
          />
        ))
      ) : (
        <p>Loading anime...</p>
      )}
    </div>
  )

}


export default function Home() {
  return (
    <>
      <AnimeThisSeason />
      <AnimeSeasonWinter />
    </>
  )
}