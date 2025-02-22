'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Anime } from '@/types/type';
import { FetchAnimeListSeasonNow } from '@/lib/animeApi';
import { AnimeCard } from "@/app/components/animeCard";

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
    <ul>
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
    </ul>
  )
}


export default function Home() {
  return (
    <AnimeThisSeason />
  )
}