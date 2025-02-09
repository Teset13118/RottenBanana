'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState<any>(null); // For storing user info
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // For tracking login status
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:8080/api/auth/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:8080/api/auth/logout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem('token');
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