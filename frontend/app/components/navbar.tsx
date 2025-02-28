'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {  User }  from '@/types/type';
import { fetchUserProfile, LogoutUser } from '@/lib/userApi';
import "@/styles/globals.css";

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