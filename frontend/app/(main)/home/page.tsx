'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Anime } from '@/types/type';
import { FetchAnimeListSeasonNow, FetchAnimeSeasonWinter, FetchAnimeUpComing } from '@/app/api/animeApi';
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
    <div className="carousel carousel-center bg-neutral rounded-box flex-nowrap flex overflow-x-auto no-scrollbar">
      {animeList.map((anime) => (
        <div key={anime.mal_id} className="carousel-item flex-shrink-0">
          <img
            src={anime.images.jpg.image_url}
            alt={anime.title}
            className="rounded-box w-60 cursor-pointer"
            onClick={() => handleClick(anime.mal_id)}
          />
        </div>
      ))}
    </div>

    //     {animeList.length > 0 ? (
    //       animeList.map((anime) => (
    //         <AnimeCard
    //           key={anime.mal_id}
    //           title={anime.title}
    //           imageUrl={anime.images.jpg.image_url}
    //           onClick={() => handleClick(anime.mal_id)}
    //         />
    //       ))
    //     ) : (
    //       <p>Loading anime...</p>
    //     )}
    // </div>
    
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
    <div className="flex">
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


function AnimeUpcoming(){
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const data = await FetchAnimeUpComing();
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
      {/* <AnimeUpcoming /> */}
    </>
  )
}