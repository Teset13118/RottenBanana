'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";

import { Anime} from '@/types/type';
import { FetchAnime } from '@/app/api/animeApi';
import { AnimeInfoSkeleton } from '@/app/components/skeletons/animeDetailSkeleton';


//แสดงรายละเอียดของ anime
export default function AnimeInfo() {
  const { id } = useParams() as { id: string };
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchAnime(id);
        setAnime(data);
      } catch (error) {
        console.error("Error fetching anime:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (anime) {
    sessionStorage.setItem('animeTitle', anime.title)
    sessionStorage.setItem('animePic', anime.images.jpg.image_url)
  }
  if (loading) {
    return <AnimeInfoSkeleton />;
  }
  if (!anime) {
    return <p className="text-center">Failed to load anime details. Please try again.</p>;
  }
  return (
    <div>
      {anime ? (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 w-full">
          {/* รูป anime */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 md:row-span-5 lg:row-span-5">
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="w-full h-full object-cover rounded-lg shadow-lg "
            />
          </div>

          {/* ชื่อ anime และ รายละเอียด anime */}
          <div className="col-span-1 row-span-2 md:col-span-2 lg:col-span-2 md:col-start-3 lg:col-start-3 md:row-span-2 lg:row-span-2 bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center">
            <h1 className="text-2xl md:text-3xl font-semibold mb-4">{anime.title}</h1>
            <p className="text-base md:text-lg mb-2">
              <strong>Genres:</strong> {anime.genres.map(genre => genre.name).join(', ')}
            </p>
            <p className="text-base md:text-lg mb-2">{anime.season} {anime.year}</p>
            <p className="text-sm md:text-md text-gray-600">{anime.rating}</p>
          </div>

          {/* YouTube Trailer */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 md:col-start-3 lg:col-start-5 md:row-span-3 lg:row-span-2 h-full">
            <div className="relative w-full h-full min-h-[200px]">
              <iframe
                src={anime.trailer.embed_url}
                title="YouTube Video"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>

          {/* เรื่องย่อ */}
          <div className="col-span-1 md:col-span-4 lg:col-span-4 md:col-start-1 lg:col-start-3 md:row-span-2 lg:row-span-3 bg-white p-6 rounded-lg shadow-lg h-full flex flex-col">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Synopsis</h2>
            <p className="text-sm md:text-md text-gray-700 flex-grow">{anime.synopsis}</p>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading anime details...</p>
      )}
    </div>
  );
};