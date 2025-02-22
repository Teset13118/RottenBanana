'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {  User }  from '@/types/type';
import { fetchUserProfile, LogoutUser } from '@/lib/userApi'; 

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
    <nav>
      <ul>
        {!isLoggedIn ? (
          <>
            <li>
              <a href="/">home</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="/">home</a>
            </li>
            <li>
              <span>Hello, {user?.username}</span>
            </li>
            <li>
              <a href="/profile">Profile</a>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </nav>
  );
};