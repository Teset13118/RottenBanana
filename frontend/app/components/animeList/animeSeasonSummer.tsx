'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Anime } from '@/types/type';
import { FetchAnimeSeasonSummer } from '@/app/api/animeApi';
import { AnimeCard } from "@/app/components/animeList/animeCard";
import { AnimeCarouselSkeleton } from "../skeletons/animeSkeletion";

//summer season
export function AnimeSeasonSummer() {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(5); // ค่าเริ่มต้นสำหรับเดสก์ท็อป
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const data = await FetchAnimeSeasonSummer();
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

  // ตรวจสอบขนาดหน้าจอเพื่อกำหนดจำนวนอนิเมะที่แสดงต่อ 1 สไลด์
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(1); // ถ้าหน้าจอเล็ก แสดง 2 เรื่องต่อสไลด์
      } else {
        setItemsPerSlide(5); // ถ้าหน้าจอใหญ่ แสดง 5 เรื่อง
      }
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  const handleClick = (id: number) => {
    router.push(`/home/animeDetail/${id}`);
  };

  const handleNext = () => {
    if (animeList.length > 0) {
      setCurrentIndex((prev) => (prev + itemsPerSlide < animeList.length ? prev + itemsPerSlide : 0));
    }
  };

  const handlePrev = () => {
    if (animeList.length > 0) {
      setCurrentIndex((prev) => (prev - itemsPerSlide >= 0 ? prev - itemsPerSlide : animeList.length - itemsPerSlide));
    }
  };

  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold mt-4 sm:mt-8 px-4 sm:px-7 mb-1 text-white mx-3 sm:mx-7 py-1 sm:py-2 bg-[#E73D1D] rounded-lg text-center">
        Season Summer
      </h1><hr className="mx-3 sm:mx-7" />
      <div className="relative w-full overflow-hidden">
        {/* ปุ่มเลื่อนซ้าย */}
        <button onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 btn btn-circle z-10 rounded-3xl p-3 bg-gray-500 opacity-[70%] hover:bg-gray-600 text-white">
          ❮
        </button>

        {/* Carousel */}
        {loading ? (
          <AnimeCarouselSkeleton />
        ) : (
          <div className="w-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex / itemsPerSlide) * 100}%)`, // เลื่อนทีละ 1 เรื่อง (5 เรื่อง = 100% / 5 = 20%)
              }}
            >
              {animeList.concat(animeList).map((anime, index) => (
                <div key={index} className="lg:w-1/5 flex-shrink-0 p-2">
                  <AnimeCard
                    title={anime.title}
                    imageUrl={anime.images.jpg.image_url}
                    onClick={() => handleClick(anime.mal_id)}
                  />
                </div>
              ))}
            </div>
          </div>
        )};

        {/* ปุ่มเลื่อนขวา */}
        <button onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-circle rounded-3xl z-10 p-3 bg-gray-500 opacity-[70%] hover:bg-gray-600 text-white">
          ❯
        </button>
      </div>
    </>
  )

}