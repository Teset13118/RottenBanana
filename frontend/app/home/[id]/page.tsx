'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";

interface Anime  {
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}

export default function Info() {
  const { id } = useParams();
  const [anime, setAnime] = useState<Anime | null>(null);

  useEffect(() => {
      fetch(`http://localhost:8080/api/anime/${id}`)
        .then((res) => res.json())
        .then((data) => setAnime(data))
        .catch((err) => console.error('Error fetching anime info:', err));
  }, [id]);

  console.log(anime)

  return (
      <div>
        <p>{id ? `Anime ID: ${id}` : "No ID found"}</p>
        {anime ? (
          <div>
            <h1>{anime.title}</h1>
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              style={{ width: "300px", height: "450px", objectFit: "cover", borderRadius: "10px" }}
            />
          </div>
        ) : (
          <p>Loading anime details...</p>
        )}
      </div>
    );
  }
