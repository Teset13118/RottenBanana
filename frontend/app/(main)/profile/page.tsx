'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {  User }  from '@/types/type';
import { fetchUserProfile } from '@/lib/userApi'; 


export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchUserProfile() 
        setUser(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Id: {user._id}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};
