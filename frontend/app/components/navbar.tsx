'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {  Anime, User }  from '@/types/type';
import { fetchUserProfile, LogoutUser } from '@/app/api/userApi';
import { FetchAnimeSearch } from '@/app/api/animeApi';
import axios from "axios";
import "@/styles/globals.css";


function ComboBox(){
  const [searchQuery, setSearchQuery] = useState("");
  const [animeResults, setAnimeResults] = useState<Anime[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setAnimeResults([]);
      setIsOpen(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await FetchAnimeSearch(searchQuery);
        setAnimeResults(response);
        setIsOpen(true);
      } catch (error) {
        console.error("Error fetching anime:", error);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchData();
    }, 500); // ดีเลย์ 500ms เพื่อลดการเรียก API ถี่เกินไป

    return () => clearTimeout(delayDebounce); // ล้าง Timeout ถ้าผู้ใช้พิมพ์ต่อ
  }, [searchQuery]);

  const handleClick = (id: number) => {
    router.push(`/home/animeDetail/${id}`);
    setIsOpen(false);
  };



  return (
    <div className="relative w-[800px]">
      <input
        type="text"
        className="w-full px-3 py-2 border rounded-3xl focus:outline-none"
        placeholder="Search Anime"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {isOpen && animeResults.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg">
          {animeResults.map((anime) => (
            <li
              key={anime.mal_id}
              className="p-2 flex justify-between items-center gap-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleClick(anime.mal_id)}
            >
              {anime.title}
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-12 h-12 object-cover rounded-md"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default function Navbar() {
  const [user, setUser] = useState<User | null>(null); // For storing user info
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // For tracking login status
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const router = useRouter();
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchUserProfile();
        if (data){
          setUser(data);
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await LogoutUser()
      setIsLoggedIn(false);
      setUser(null);
      router.push('/');
    } catch (error) {
      setErrorMessage('Error during logout');
    }
  };

  const toggleDropdown = () => {
    setThemeOpen(!themeOpen);
  };
  
  return (
    <header className="text-gray-800 bg-[#FFC300] body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0" href="/">
          <span className="text-xl font-bold mr-5 hover:text-white transition-colors duration-300">
            Rotten Bananas
          </span>
        </a>
        <div className="flex ml-10 items-center justify-center">
          <ComboBox />
        </div>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {!isLoggedIn ? (
            <>
              <>
                <a className="mr-5 hover:text-white" href="/login">Login</a>
                <a className="mr-5 hover:text-white" href="/register">Register</a>
              </>
            </>
          ) : (
            <div className="relative">
              {/* รูปโปรไฟล์ */}
              <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt="profilePic"
                  className="rounded-full size-10 border hover:border-gray-300"
                />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden border">
                  <a href="/profile" className="block px-4 py-2 hover:bg-gray-200">
                    Profile
                  </a>
                  <hr />

                  {/* ยังใช้งานไม่ได้ */}
                  <div className="relative">
                    <button onClick={() => setThemeOpen(!themeOpen)} className="w-full px-4 py-2 hover:bg-gray-200 flex justify-between items-center">
                      Theme <span>❯</span>
                    </button>

                    {themeOpen && (
                      <div className="absolute left-full top-0 ml-2 w-32 bg-white shadow-lg rounded-md border">
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                          Dark
                        </button>
                        <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                          Light
                        </button>
                      </div>
                    )}
                  </div>
                  <hr/>

                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          <>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          </>
        </nav>
      </div>
    </header>
  );
};