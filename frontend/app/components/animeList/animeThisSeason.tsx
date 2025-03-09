'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Anime } from '@/types/type';
import { FetchAnimeListSeasonNow } from '@/app/api/animeApi';
import { AnimeCarouselThisSeasonSkeleton } from "../skeletons/animeSkeletion";

//slide anime season now
export function AnimeThisSeason() {
    const [animeList, setAnimeList] = useState<Anime[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
  
    const fetchData = async () => {
      try {
        const data = await FetchAnimeListSeasonNow();
        setAnimeList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleClick = (id: number) => {
      router.push(`/home/animeDetail/${id}`);
    };

    if (loading) {
      return <AnimeCarouselThisSeasonSkeleton/>
    }
  
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
    )
  }
  