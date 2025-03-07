'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Anime } from '@/types/type';
import { FetchAnimeListSeasonNow, FetchAnimeSeasonWinter, FetchAnimeSeasonFall, FetchAnimeSeasonSummer, FetchAnimeUpComing, FetchAnimeSeasonSpring } from '@/app/api/animeApi';
import { AnimeCard } from "@/app/components/animeCard";

//upcoming
export function AnimeUpcoming(){
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const handleNext = () => {
    setCurrentIndex((prev) => prev > animeList.length ? prev + 1 : 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => prev < animeList.length ? prev - 1 : 0);
  };

  return (
    <>
      <h1 className="text-2xl text-bold mt-8 px-7 mb-1 text-[#ffffff] mx-7 py-2 bg-[#366fac] rounded-lg text-center">
        Upcoming
      </h1><hr className="mx-7"/>
      <div className="relative w-full overflow-hidden">
        {/* ปุ่มเลื่อนซ้าย */}
        <button onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 btn btn-circle z-10 rounded-3xl p-3 bg-gray-500 opacity-[70%] hover:bg-gray-600 text-white">
          ❮
        </button>

        {/* Carousel */}
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`, // เลื่อนทีละ 1 เรื่อง (5 เรื่อง = 100% / 5 = 20%)
            }}
          >
            {animeList.concat(animeList).map((anime, index) => (
              <div key={index} className="w-1/5 flex-shrink-0 p-2">
                <AnimeCard
                  title={anime.title}
                  imageUrl={anime.images.jpg.image_url}
                  onClick={() => handleClick(anime.mal_id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ปุ่มเลื่อนขวา */}
        <button onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-circle rounded-3xl z-10 p-3 bg-gray-500 opacity-[70%] hover:bg-gray-600 text-white">
          ❯
        </button>
      </div>
    </>
    
  )

}
