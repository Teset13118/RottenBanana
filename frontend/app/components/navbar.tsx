'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {  Anime, User }  from '@/types/type';
import { fetchUserProfile, LogoutUser } from '@/lib/userApi';
import { FetchAnimeSearch } from '@/lib/animeApi';
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
    <div className="relative w-64">
      <input
        type="text"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none"
        placeholder="Search Anime"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {isOpen && animeResults.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg">
          {animeResults.map((anime) => (
            <li
              key={anime.mal_id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleClick(anime.mal_id)}
            >
              {anime.title}
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
    <header className="text-gray-800 bg-[#FFC300] body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <span className="text-xl">Rotten Bananas</span>
        </a>
        <div className="search-box ml-10">
          <ComboBox />
        </div>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <>
          {!isLoggedIn ? (
            <>
              <>
                <a className="mr-5 hover:text-white" href="/login">Login</a>
                <a className="mr-5 hover:text-white" href="/register">Register</a>
              </>
            </>
          ) : (
            <>
              <>
                <a className="mr-5 hover:text-white" href="/">home</a>
                {/* <span>Hello, {user?.username}</span> */}
                <a className="mr-5 hover:text-white" href="/profile">Profile</a>
              </>
              <button onClick={handleLogout} className="inline-flex items-center bg-[#FF0000] border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">Logout</button>
            </>
          )}
          </>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </nav>
        
      </div>
    </header>
  );
};