'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

type User = {
  _id: number;
  username: string;
  email: string;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
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
