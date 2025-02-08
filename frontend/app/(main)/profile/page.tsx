'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

type User = {
  username: string;
  email: string;
  // Add other user properties if needed
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null); // Explicitly typed

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data); // The response data should be of type 'User'
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
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
