"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { fetchOtherUserProfile } from '@/lib/userApi'; 

export default function OtherUserProfile() {
  const { userId } = useParams() as {userId:string}; // ดึง userId จาก URL
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchOtherUserProfile(userId);
        setUser(data);
      } catch (err) {
        setError("User not found");
      }
    };
    fetchUser();
  }, [userId]);

  if (error) return <div>{error}</div>;
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile of {user.username}</h1>
      <p>Email: {user.email}</p>
      <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
