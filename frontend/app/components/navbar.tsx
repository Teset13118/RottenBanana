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
        className="w-full px-3 py-2 border-2 border-[#977810] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#977810]"
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
  const [isMainDropdown, setIsMainDropdown] = useState(false);
  const [isThemeDropdown, setIsThemeDropdown] = useState(false);
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

  
  return (
    <header className="text-gray-800 bg-[#FEC81A] body-font z-10">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-[#E73D1D] mb-4 md:mb-0" href="/">
          <span className="text-3xl font-bold mr-5 bg-gradient-to-r from-[#E73D1D] to-[#977810] text-transparent bg-clip-text hover:text-[#715f25] transition-colors duration-300">
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
                <a className="mr-2 px-4 py-2 bg-[#03BD70] text-white rounded-lg hover:bg-[#2b8560] transition-colors duration-300" href="/login">Login</a>
                <a className="mr-0 px-4 py-2 bg-[#366fac] text-white rounded-lg hover:bg-[#2a5688] transition-colors duration-300" href="/register">Register</a>
              </>
            </>
          ) : (
            <div className="relative">
              {/* รูปโปรไฟล์ */}
              <button onClick={() => { setIsMainDropdown(!isMainDropdown); setIsThemeDropdown(false); }}
                className="focus:outline-none"
              >
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt="profilePic"
                  className="rounded-full size-10 border-4 border-white hover:border-[#715f25]"
                />
              </button>

              {/* Dropdown เมนูหลัก */}
              {isMainDropdown && !isThemeDropdown && (
                <div className="absolute right-[50px] mt-0 top-0 w-48 bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden z-10">
                  <a href="/profile" className="block px-4 py-2 hover:bg-gray-900">
                    Profile
                  </a>
                  <hr />
                  <button
                    onClick={() => {
                      setIsThemeDropdown(true);
                      setIsMainDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-900 flex justify-between"
                  >
                    Theme <span>❯</span>
                  </button>
                  <hr />
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-700 text-white">
                    Logout
                  </button>
                </div>
              )}

              {/* Dropdown Theme */}
              {isThemeDropdown && (
                <div className="absolute right-[50px] mt-0 top-0 w-48 bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden z-10">
                  <button
                    onClick={() => {
                      setIsThemeDropdown(false);
                      setIsMainDropdown(true);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-900"
                  >
                    ❮
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-900">
                    Dark
                  </button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-900">
                    Light
                  </button>
                </div>
              )}
            </div>
          )}
          <>
            {errorMessage && <div className="text-[#E73D1D]">{errorMessage}</div>}
          </>
        </nav>
      </div>
    </header>
  );
};